/* eslint-disable no-unexpected-multiline */
import dotenv from 'dotenv';
import { expect } from 'chai';
import {
  BalancerError,
  BalancerErrorCode,
  BalancerSDK,
  Network,
  Pool,
  PoolModel,
  PoolToken,
  StaticPoolRepository,
} from '@/.';
import hardhat from 'hardhat';

import { TransactionReceipt } from '@ethersproject/providers';
import { parseFixed, BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';

import { forkSetup, setupPool, getBalances } from '@/test/lib/utils';
import pools_14717479 from '@/test/lib/pools_14717479.json';
import { PoolsProvider } from '@/modules/pools/provider';

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl } = process.env;
const { ethers } = hardhat;

let balancer: BalancerSDK;
const rpcUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, 1);
const signer = provider.getSigner();
let signerAddress: string;

// Slots used to set the account balance for each token through hardhat_setStorageAt
// Info fetched using npm package slot20
const wBTC_SLOT = 0;
const wETH_SLOT = 3;
const slots = [wBTC_SLOT, wETH_SLOT];

const initialBalance = '100000';
const amountsInDiv = '100000000';

let tokensIn: PoolToken[];
let amountsIn: string[];
// Test scenarios

describe('join execution', async () => {
  let transactionReceipt: TransactionReceipt;
  let bptBalanceBefore: BigNumber;
  let bptMinBalanceIncrease: BigNumber;
  let bptBalanceAfter: BigNumber;
  let tokensBalanceBefore: BigNumber[];
  let tokensBalanceAfter: BigNumber[];
  let pool: PoolModel;

  // Setup chain
  before(async function () {
    this.timeout(20000);
    const sdkConfig = {
      network: Network.MAINNET,
      rpcUrl,
    };
    // Using a static repository to make test consistent over time
    const poolsProvider = new PoolsProvider(
      sdkConfig,
      new StaticPoolRepository(pools_14717479 as Pool[])
    );
    balancer = new BalancerSDK(
      sdkConfig,
      undefined,
      undefined,
      undefined,
      poolsProvider
    );
    const poolSetup = await setupPool(
      poolsProvider,
      '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e' // B_50WBTC_50WETH
    );
    if (!poolSetup) throw Error('Error setting up pool.');
    pool = poolSetup;
    tokensIn = pool.tokens;
    const balances = [
      parseFixed(initialBalance, tokensIn[0].decimals).toString(),
      parseFixed(initialBalance, tokensIn[1].decimals).toString(),
    ];
    await forkSetup(
      signer,
      tokensIn.map((t) => t.address),
      slots,
      balances,
      jsonRpcUrl as string,
      false,
      14717479 // holds the same state as the static repository
    );
    signerAddress = await signer.getAddress();
  });

  context('join transaction - join with encoded data', () => {
    before(async function () {
      this.timeout(20000);
      amountsIn = tokensIn.map((t) =>
        parseFixed(t.balance, t.decimals).div(amountsInDiv).toString()
      );

      [bptBalanceBefore, ...tokensBalanceBefore] = await getBalances(
        [pool.address, ...tokensIn.map((t) => t.address)],
        signer,
        signerAddress
      );

      const slippage = '100';

      const { to, data, minBPTOut } = await pool.buildJoin(
        signerAddress,
        tokensIn.map((t) => t.address),
        amountsIn,
        slippage
      );
      const tx = { to, data };

      bptMinBalanceIncrease = BigNumber.from(minBPTOut);
      transactionReceipt = await (await signer.sendTransaction(tx)).wait();
      [bptBalanceAfter, ...tokensBalanceAfter] = await getBalances(
        [pool.address, ...tokensIn.map((t) => t.address)],
        signer,
        signerAddress
      );
    });

    it('should work', async () => {
      expect(transactionReceipt.status).to.eql(1);
    });

    it('should increase BPT balance', async () => {
      expect(
        bptBalanceAfter.sub(bptBalanceBefore).toNumber()
      ).to.greaterThanOrEqual(bptMinBalanceIncrease.toNumber());
    });

    it('should decrease tokens balance', async () => {
      for (let i = 0; i < tokensIn.length; i++) {
        expect(
          tokensBalanceBefore[i].sub(tokensBalanceAfter[i]).toString()
        ).to.equal(amountsIn[i]);
      }
    });
  });

  context('join transaction - join with params', () => {
    before(async function () {
      this.timeout(20000);

      amountsIn = tokensIn.map((t) =>
        parseFixed(t.balance, t.decimals).div(amountsInDiv).toString()
      );

      [bptBalanceBefore, ...tokensBalanceBefore] = await getBalances(
        [pool.address, ...tokensIn.map((t) => t.address)],
        signer,
        signerAddress
      );

      const slippage = '100';
      const { functionName, attributes, value, minBPTOut } =
        await pool.buildJoin(
          signerAddress,
          tokensIn.map((t) => t.address),
          amountsIn,
          slippage
        );
      const transactionResponse = await balancer.contracts.vault
        .connect(signer)
        [functionName](...Object.values(attributes), { value });
      transactionReceipt = await transactionResponse.wait();

      bptMinBalanceIncrease = BigNumber.from(minBPTOut);
      [bptBalanceAfter, ...tokensBalanceAfter] = await getBalances(
        [pool.address, ...tokensIn.map((t) => t.address)],
        signer,
        signerAddress
      );
    });

    it('should work', async () => {
      expect(transactionReceipt.status).to.eql(1);
    });

    it('should increase BPT balance', async () => {
      expect(
        bptBalanceAfter.sub(bptBalanceBefore).toNumber()
      ).to.greaterThanOrEqual(bptMinBalanceIncrease.toNumber());
    });

    it('should decrease tokens balance', async () => {
      for (let i = 0; i < tokensIn.length; i++) {
        expect(
          tokensBalanceBefore[i].sub(tokensBalanceAfter[i]).toString()
        ).to.equal(amountsIn[i]);
      }
    });
  });

  context('join transaction - join with ETH', () => {
    let transactionCost: BigNumber;
    before(async function () {
      this.timeout(20000);

      amountsIn = tokensIn.map((t) =>
        parseFixed(t.balance, t.decimals).div(amountsInDiv).toString()
      );

      const tokensWithETH = tokensIn.map((t) => {
        if (
          t.address ===
          balancer.networkConfig.addresses.tokens.wrappedNativeAsset
        )
          return AddressZero;
        return t.address;
      });

      [bptBalanceBefore, ...tokensBalanceBefore] = await getBalances(
        [pool.address, ...tokensWithETH],
        signer,
        signerAddress
      );

      const slippage = '100';
      const { to, data, value, minBPTOut } = await pool.buildJoin(
        signerAddress,
        tokensWithETH,
        amountsIn,
        slippage
      );
      const tx = { to, data, value };

      bptMinBalanceIncrease = BigNumber.from(minBPTOut);
      transactionReceipt = await (await signer.sendTransaction(tx)).wait();
      transactionCost = transactionReceipt.gasUsed.mul(
        transactionReceipt.effectiveGasPrice
      );

      [bptBalanceAfter, ...tokensBalanceAfter] = await getBalances(
        [pool.address, ...tokensWithETH],
        signer,
        signerAddress
      );
      tokensWithETH.map((t, i) => {
        if (t === AddressZero) {
          tokensBalanceAfter[i] = tokensBalanceAfter[i].add(transactionCost);
        }
      });
    });

    it('should work', async () => {
      expect(transactionReceipt.status).to.eql(1);
    });

    it('should increase BPT balance', async () => {
      expect(
        bptBalanceAfter.sub(bptBalanceBefore).toNumber()
      ).to.greaterThanOrEqual(bptMinBalanceIncrease.toNumber());
    });

    it('should decrease tokens balance', async () => {
      for (let i = 0; i < tokensIn.length; i++) {
        expect(
          tokensBalanceBefore[i].sub(tokensBalanceAfter[i]).toString()
        ).to.equal(amountsIn[i]);
      }
    });
  });

  context('join transaction - single token join', () => {
    before(async function () {
      this.timeout(20000);
      amountsIn = [
        parseFixed(tokensIn[1].balance, tokensIn[1].decimals)
          .div('100')
          .toString(),
      ];
    });

    it('should fail on number of input tokens', async () => {
      const slippage = '10';
      let errorMessage;
      try {
        await pool.buildJoin(
          signerAddress,
          tokensIn.map((t) => t.address),
          amountsIn,
          slippage
        );
      } catch (error) {
        errorMessage = (error as Error).message;
      }
      expect(errorMessage).to.contain(
        BalancerError.getMessage(BalancerErrorCode.INPUT_LENGTH_MISMATCH)
      );
    });
  });
}).timeout(20000);
