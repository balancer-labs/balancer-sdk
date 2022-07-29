import dotenv from 'dotenv';
import { expect } from 'chai';
import { factories } from '@/test/factories';
import {
  BalancerSdkConfig,
  BalancerSdkSorConfig,
  Network,
  BalancerSDK,
  Swaps,
} from '@/.';
import { getNetworkConfig } from '@/modules/sdk.helpers';
import { mockPool, mockPoolDataService } from '@/test/lib/mockPool';
import { SwapTransactionRequest, SwapType } from './types';
import { Vault__factory } from '@balancer-labs/typechain';
import BatchRelayerLibraryAbi from '@/lib/abi/BatchRelayerLibrary.json';
import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { SwapInfo } from '@balancer-labs/sor';
import hardhat from 'hardhat';

dotenv.config();

const sorConfig: BalancerSdkSorConfig = {
  tokenPriceService: 'coingecko',
  poolDataService: mockPoolDataService,
  fetchOnChainBalances: false,
};

const sdkConfig: BalancerSdkConfig = {
  network: Network.KOVAN,
  rpcUrl: `https://kovan.infura.io/v3/${process.env.INFURA}`,
  sor: sorConfig,
};

const vaultInterface = Vault__factory.createInterface();
const vaultActions = new Interface(BatchRelayerLibraryAbi);

const funds = {
  fromInternalBalance: false,
  recipient: '0x35f5a330FD2F8e521ebd259FA272bA8069590741',
  sender: '0x35f5a330FD2F8e521ebd259FA272bA8069590741',
  toInternalBalance: false,
};

const assets = [
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3',
];

const deadline = '999999999999999999'; // Infinity

describe('swaps module', () => {
  context('instantiation', () => {
    it('instantiate via module', async () => {
      const swaps = new Swaps(sdkConfig);
      await swaps.fetchPools();
      const pools = swaps.getPools();
      expect(pools).to.deep.eq([mockPool]);
    });

    it('instantiate via SDK', async () => {
      const balancer = new BalancerSDK(sdkConfig);
      await balancer.swaps.fetchPools();
      const pools = balancer.swaps.getPools();
      expect(pools).to.deep.eq([mockPool]);
    });
  });

  describe('#encodeBatchSwap', () => {
    it('should returns an ABI byte string', () => {
      const params = {
        kind: SwapType.SwapExactIn,
        swaps: [
          {
            poolId:
              '0x7320d680ca9bce8048a286f00a79a2c9f8dcd7b3000100000000000000000044',
            assetInIndex: 0,
            assetOutIndex: 1,
            amount: '10000',
            userData: '0x',
          },
          {
            poolId:
              '0x36128d5436d2d70cab39c9af9cce146c38554ff0000100000000000000000008',
            assetInIndex: 1,
            assetOutIndex: 0,
            amount: '0',
            userData: '0x',
          },
        ],
        assets,
        funds,
        limits: [0, 0], // No limits
        deadline,
      };

      expect(Swaps.encodeBatchSwap(params)).to.equal(
        '0x945bcec900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000030000000000000000000000000035f5a330fd2f8e521ebd259fa272ba8069590741000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035f5a330fd2f8e521ebd259fa272ba8069590741000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003600000000000000000000000000000000000000000000000000de0b6b3a763ffff0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001007320d680ca9bce8048a286f00a79a2c9f8dcd7b300010000000000000000004400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000036128d5436d2d70cab39c9af9cce146c38554ff000010000000000000000000800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000009a71012b13ca4d3d0cdc72a177df3ef03b0e76a3000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      );
    });
  });

  describe('#encodeSimpleFlashSwap', () => {
    it('should returns an ABI byte string', () => {
      const params = {
        flashLoanAmount: '10000',
        poolIds: [
          '0x7320d680ca9bce8048a286f00a79a2c9f8dcd7b3000100000000000000000044',
          '0x36128d5436d2d70cab39c9af9cce146c38554ff0000100000000000000000008',
        ],
        assets,
        walletAddress: '0x35f5a330FD2F8e521ebd259FA272bA8069590741',
      };

      expect(Swaps.encodeSimpleFlashSwap(params)).to.equal(
        '0x945bcec900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000030000000000000000000000000035f5a330fd2f8e521ebd259fa272ba8069590741000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035f5a330fd2f8e521ebd259fa272ba8069590741000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003600000000000000000000000000000000000000000000000000de0b6b3a763ffff0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001007320d680ca9bce8048a286f00a79a2c9f8dcd7b300010000000000000000004400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000036128d5436d2d70cab39c9af9cce146c38554ff000010000000000000000000800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000009a71012b13ca4d3d0cdc72a177df3ef03b0e76a3000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
      );
    });
  });

  describe('#buildTransaction', () => {
    const configWithLido = { ...sdkConfig, network: 1 };
    const networkConfig = getNetworkConfig(configWithLido);
    const { stETH } = networkConfig.addresses.tokens;
    const { contracts } = networkConfig.addresses;
    const swaps = new Swaps(configWithLido);

    const subject = (
      swapInfo: SwapInfo,
      recipient?: string
    ): SwapTransactionRequest => {
      return swaps.buildSwap({
        userAddress: '0x2940211793749d9edbDdBa80ac142Fb18BE44257',
        recipient,
        swapInfo,
        kind: SwapType.SwapExactIn,
        deadline: BigNumber.from('0'),
        maxSlippage: 1,
      });
    };

    context('singleSwap', () => {
      context('when all ERC20', () => {
        const swapInfo = factories.swapInfo.build({
          tokenIn: AddressZero,
          tokenOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // wBTC
        });
        const { data, to } = subject(swapInfo);

        it('expect execution via vault', () => {
          const decoded = vaultInterface.decodeFunctionData('swap', data);

          expect(decoded.length).to.eql(4);
          expect(to).to.eql(contracts.vault);
        });
      });

      context('when tokenIn is stETH', () => {
        const swapInfo = factories.swapInfo.build({
          tokenIn: stETH,
          tokenOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // wBTC
        });
        const { data, to } = subject(swapInfo);

        it('relayer should be lido', () => {
          const decoded = vaultActions.decodeFunctionData('swap', data);
          expect(decoded.length).to.eql(6);
          expect(to).to.eql(contracts.lidoRelayer);
        });
      });

      context('with custom recipient', () => {
        const recipient = '0x71bE63f3384f5fb98995898A86B02Fb2426c5788';
        const swapInfo = factories.swapInfo.build();
        const { data } = subject(swapInfo, recipient);

        it('funds params match the recipient', () => {
          const decoded = vaultInterface.decodeFunctionData('swap', data);
          expect(decoded.funds.recipient).to.eql(recipient);
        });
      });
    });

    context('batchSwap', () => {
      context('when tokens are ERC20', () => {
        const swapInfo = factories.swapInfo
          .afterBuild((swap) => {
            swap.swaps.push(factories.swapV2.build());
          })
          .build({
            tokenIn: AddressZero,
            tokenOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // wBTC
          });
        const { data, to } = subject(swapInfo);

        it('expect execution via vault', () => {
          const decoded = vaultInterface.decodeFunctionData('batchSwap', data);

          expect(decoded.length).to.eql(6);
          expect(to).to.eql(contracts.vault);
        });
      });
      context('when tokenIn is stETH', () => {
        const swapInfo = factories.swapInfo
          .afterBuild((swap) => {
            swap.swaps.push(factories.swapV2.build());
          })
          .build({
            tokenIn: stETH,
            tokenOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // wBTC
          });
        const { data, to } = subject(swapInfo);

        it('relayer should be lido', () => {
          const decoded = vaultActions.decodeFunctionData('batchSwap', data);

          // batchSwap for a relayer recieves 8 arguments
          expect(decoded.length).to.eql(8);
          expect(to).to.eql(contracts.lidoRelayer);
        });
      });
    });
  });

  describe('full flow', () => {
    const swaps = new Swaps({
      network: Network.MAINNET,
      rpcUrl: `localhost:8545`,
      sor: sorConfig,
    });

    const tokenIn = AddressZero; // ETH
    const tokenOut = '0xba100000625a3754423978a60c9317c58a424e3d'; // BAL
    const amount = hardhat.ethers.utils.parseEther('1');
    const gasPrice = hardhat.ethers.utils.parseUnits('50', 'gwei');
    const maxPools = 4;
    const deadline = MaxUint256;
    const maxSlippage = 10;

    let signer: SignerWithAddress, recipient: SignerWithAddress;

    before(async () => {
      const signers = await hardhat.ethers.getSigners();
      signer = signers[0];
      recipient = signers[1];
      await swaps.fetchPools();
    });

    it('should work', async () => {
      const swapInfo: SwapInfo = await swaps.findRouteGivenIn({
        tokenIn,
        tokenOut,
        amount,
        gasPrice,
        maxPools,
      });

      const { to, data, value } = swaps.buildSwap({
        userAddress: signer.address,
        recipient: recipient.address,
        swapInfo,
        kind: SwapType.SwapExactIn,
        deadline,
        maxSlippage,
      });

      const receipt = await (
        await signer.sendTransaction({ to, data, value })
      ).wait();

      expect(receipt.status).to.be.eql(1);
    });
  });
});
