import dotenv from 'dotenv';
import { expect } from 'chai';
import hardhat from 'hardhat';
import {
  BalancerError,
  BalancerErrorCode,
  Network,
  RelayerAuthorization,
  PoolModel,
  Subgraph,
  SubgraphPoolRepository,
} from '@/.';
import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { Contracts } from '@/modules/contracts/contracts.module';
import { ADDRESSES } from './addresses';
import { setBalance } from '@nomicfoundation/hardhat-network-helpers';
import { parseEther } from '@ethersproject/units';
import { JsonRpcSigner } from '@ethersproject/providers';
import { MaxUint256 } from '@ethersproject/constants';
import { Migrations } from '../migrations';

import { Interface } from '@ethersproject/abi';
import { PoolsProvider } from '@/modules/pools/provider';
const liquidityGaugeAbi = ['function deposit(uint value) payable'];
const liquidityGauge = new Interface(liquidityGaugeAbi);

/*
 * Testing on GOERLI
 * - Update hardhat.config.js with chainId = 5
 * - Update ALCHEMY_URL on .env with a goerli api key
 * - Run goerli node on terminal: yarn run node
 * - Change `network` to Network.GOERLI
 * - Provide gaugeAddresses from goerli which can be found on subgraph: https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-goerli
 */

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl, FORK_BLOCK_NUMBER: blockNumber } = process.env;
const { ethers } = hardhat;
const MAX_GAS_LIMIT = 8e6;

const network = Network.GOERLI;
const rpcUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, network);
const addresses = ADDRESSES[network];
const { contracts } = new Contracts(network as number, provider);
const migrations = new Migrations(network);

const holderAddress = '0xd86a11b0c859c18bfc1b4acd072c5afe57e79438';
const poolAddress = addresses.bbausd1.address;
const gaugeAddress = addresses.bbausd1.gauge;
const relayer = addresses.relayer;

const getErc20Balance = (token: string, holder: string): Promise<BigNumber> =>
  contracts.ERC20(token, provider).balanceOf(holder);

// https://hardhat.org/hardhat-network/docs/guides/forking-other-networks#impersonating-accounts
// WARNING: don't use hardhat SignerWithAddress to sendTransactions!!
// It's not working and we didn't have time to figure out why.
// Use JsonRpcSigner instead
const impersonateAccount = async (account: string) => {
  await provider.send('hardhat_impersonateAccount', [account]);
  await setBalance(account, parseEther('10000'));
  return provider.getSigner(account);
};

const signRelayerApproval = async (
  relayerAddress: string,
  signerAddress: string,
  signer: JsonRpcSigner
): Promise<string> => {
  const approval = contracts.vault.interface.encodeFunctionData(
    'setRelayerApproval',
    [signerAddress, relayerAddress, true]
  );

  const signature =
    await RelayerAuthorization.signSetRelayerApprovalAuthorization(
      contracts.vault,
      signer,
      relayerAddress,
      approval
    );

  const calldata = RelayerAuthorization.encodeCalldataAuthorization(
    '0x',
    MaxUint256,
    signature
  );

  return calldata;
};

const reset = async () =>
  provider.send('hardhat_reset', [
    {
      forking: {
        jsonRpcUrl,
        blockNumber: (blockNumber && parseInt(blockNumber)) || 7277540,
      },
    },
  ]);

const move = async (
  token: string,
  from: string,
  to: string
): Promise<BigNumber> => {
  const holder = await impersonateAccount(from);
  const balance = await getErc20Balance(token, from);
  await contracts.ERC20(token, provider).connect(holder).transfer(to, balance);

  return balance;
};

const stake = async (
  signer: JsonRpcSigner,
  balance: BigNumber
): Promise<void> => {
  await (
    await contracts
      .ERC20(poolAddress, provider)
      .connect(signer)
      .approve(gaugeAddress, MaxUint256)
  ).wait();

  await (
    await signer.sendTransaction({
      to: gaugeAddress,
      data: liquidityGauge.encodeFunctionData('deposit', [balance]),
    })
  ).wait();
};

describe('bbausd migration execution', async () => {
  let signer: JsonRpcSigner;
  let signerAddress: string;
  let authorisation: string;
  let balance: BigNumber;
  let pool: PoolModel;

  beforeEach(async function () {
    this.timeout(20000);

    await reset();

    signer = provider.getSigner();
    signerAddress = await signer.getAddress();
    authorisation = await signRelayerApproval(relayer, signerAddress, signer);
    // Transfer tokens from existing user account to signer
    // We need that to test signatures, because hardhat doesn't have impersonated accounts private keys
    balance = await move(poolAddress, holderAddress, signerAddress);

    const config = {
      network,
      rpcUrl,
    };
    const subgraph = new Subgraph(config);
    const pools = new PoolsProvider(
      config,
      new SubgraphPoolRepository(subgraph.client)
    );
    const _pool = await pools.findBy('address', poolAddress);
    if (!_pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
    pool = _pool;
  });

  async function testFlow(
    staked: boolean,
    authorized = true,
    minBbausd2Out: undefined | string = undefined
  ): Promise<string> {
    const addressIn = staked
      ? addresses.bbausd1.gauge
      : addresses.bbausd1.address;
    const addressOut = staked
      ? addresses.bbausd2.gauge
      : addresses.bbausd2.address;
    // Store balance before migration
    const before = {
      from: await getErc20Balance(addressIn, signerAddress),
      to: await getErc20Balance(addressOut, signerAddress),
    };

    const amount = before.from;

    let query = migrations.bbaUsd(
      signerAddress,
      amount.toString(),
      '0',
      staked,
      pool.tokens
        .filter((token) => token.symbol !== 'bb-a-USD') // Note that bbausd is removed
        .map((token) => parseFixed(token.balance, token.decimals).toString()),
      authorisation
    );

    const gasLimit = MAX_GAS_LIMIT;

    // Static call can be used to simulate tx and get expected BPT in/out deltas
    const staticResult = await signer.call({
      to: query.to,
      data: query.data,
      gasLimit,
    });
    const expectedBpts = query.decode(staticResult, staked);

    query = migrations.bbaUsd(
      signerAddress,
      amount.toString(),
      minBbausd2Out ? minBbausd2Out : expectedBpts.bbausd2AmountOut,
      staked,
      pool.tokens
        .filter((token) => token.symbol !== 'bb-a-USD') // Note that bbausd is removed
        .map((token) => parseFixed(token.balance, token.decimals).toString()),
      authorized ? authorisation : undefined
    );

    const response = await signer.sendTransaction({
      to: query.to,
      data: query.data,
      gasLimit,
    });

    const receipt = await response.wait();
    console.log('Gas used', receipt.gasUsed.toString());

    const after = {
      from: await getErc20Balance(addressIn, signerAddress),
      to: await getErc20Balance(addressOut, signerAddress),
    };

    console.log(expectedBpts);

    expect(BigNumber.from(expectedBpts.bbausd2AmountOut).gt(0)).to.be.true;
    expect(amount.toString()).to.eq(expectedBpts.bbausd1AmountIn);
    expect(after.to.toString()).to.eq(expectedBpts.bbausd2AmountOut);
    return expectedBpts.bbausd2AmountOut;
  }

  let bbausd2AmountOut: string;

  context('staked', async () => {
    beforeEach(async function () {
      this.timeout(20000);
      // Stake them
      await stake(signer, balance);
    });

    it('should transfer tokens from stable to boosted - using exact bbausd2AmountOut from static call', async () => {
      bbausd2AmountOut = await testFlow(true);
    }).timeout(20000);

    it('should transfer tokens from stable to boosted - limit should fail', async () => {
      let errorMessage = '';
      try {
        await testFlow(
          true,
          true,
          BigNumber.from(bbausd2AmountOut).add(1).toString()
        );
      } catch (error) {
        errorMessage = (error as Error).message;
      }
      expect(errorMessage).to.contain('BAL#507'); // SWAP_LIMIT - Swap violates user-supplied limits (min out or max in)
    }).timeout(20000);
  });

  context('not staked', async () => {
    it('should transfer tokens from stable to boosted - using exact bbausd2AmountOut from static call', async () => {
      bbausd2AmountOut = await testFlow(false);
    }).timeout(20000);

    it('should transfer tokens from stable to boosted - limit should fail', async () => {
      let errorMessage = '';
      try {
        await testFlow(
          false,
          true,
          BigNumber.from(bbausd2AmountOut).add(1).toString()
        );
      } catch (error) {
        errorMessage = (error as Error).message;
      }
      expect(errorMessage).to.contain('BAL#507'); // SWAP_LIMIT - Swap violates user-supplied limits (min out or max in)
    }).timeout(20000);
  });

  context('authorization', async () => {
    // authorisation wihtin relayer is the default case and is already tested on previous scenarios

    it('should transfer tokens from stable to boosted - pre authorized', async () => {
      const approval = contracts.vault.interface.encodeFunctionData(
        'setRelayerApproval',
        [signerAddress, relayer, true]
      );
      await signer.sendTransaction({
        to: contracts.vault.address,
        data: approval,
      });
      await testFlow(false, false);
    }).timeout(20000);

    it('should transfer tokens from stable to boosted - auhtorisation should fail', async () => {
      let errorMessage = '';
      try {
        await testFlow(false, false);
      } catch (error) {
        errorMessage = (error as Error).message;
      }
      expect(errorMessage).to.contain('BAL#503'); // USER_DOESNT_ALLOW_RELAYER - Relayers must be allowed by both governance and the user account
    }).timeout(20000);
  }).timeout(20000);
}).timeout(20000);
