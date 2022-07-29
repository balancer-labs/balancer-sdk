import dotenv from 'dotenv';
import { expect } from 'chai';
import {
  BalancerSDK,
  Network,
  Pool,
  PoolModel,
  PoolToken,
  StaticPoolRepository,
} from '@/.';
import hardhat from 'hardhat';

import { TransactionReceipt } from '@ethersproject/providers';
import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { forkSetup, setupPool, updateBalances } from '@/test/lib/utils';
import { PoolsProvider } from '@/modules/pools/provider';

import pools_14717479 from '@/test/lib/pools_14717479.json';

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl } = process.env;
const { ethers } = hardhat;

let balancer: BalancerSDK;
const rpcUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, 1);
const signer = provider.getSigner();

// Slots used to set the account balance for each token through hardhat_setStorageAt
// Info fetched using npm package slot20
const BPT_SLOT = 0;
const slippage = '100';
let tokensOut: PoolToken[];
let amountsOut: string[];
let transactionReceipt: TransactionReceipt;
let bptBalanceBefore: BigNumber;
let bptBalanceAfter: BigNumber;
let bptMaxBalanceDecrease: BigNumber;
let tokensBalanceBefore: BigNumber[];
let tokensBalanceAfter: BigNumber[];
let tokensMinBalanceIncrease: BigNumber[];
let signerAddress: string;
let pool: PoolModel;

const testExitPool = (poolId: string) => {
  describe('exit execution', async () => {
    // Setup chain
    before(async function () {
      const initialBalance = '100000';

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
      const poolSetup = await setupPool(poolsProvider, poolId);
      if (!poolSetup) throw Error('Error setting up pool.');
      pool = poolSetup;
      tokensOut = pool.tokens;
      await forkSetup(
        balancer,
        signer,
        [pool.address],
        [BPT_SLOT],
        [parseFixed(initialBalance, 18).toString()],
        jsonRpcUrl as string,
        14717479 // holds the same state as the static repository
      );
      signerAddress = await signer.getAddress();
    });

    context('exitExactBPTIn', async () => {
      const bptIn = parseFixed('10', 18).toString();

      context('encoded data', async () => {
        before(async function () {
          this.timeout(20000);
          [bptBalanceBefore, ...tokensBalanceBefore] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );

          const { to, data, minAmountsOut, maxBPTIn } =
            pool.buildExitExactBPTIn(signerAddress, bptIn, slippage);
          const tx = { to, data };

          bptMaxBalanceDecrease = BigNumber.from(maxBPTIn);
          tokensMinBalanceIncrease = minAmountsOut.map((a) =>
            BigNumber.from(a)
          );
          const transactionResponse = await signer.sendTransaction(tx);
          transactionReceipt = await transactionResponse.wait();
          [bptBalanceAfter, ...tokensBalanceAfter] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );
        });

        it('should work', async () => {
          expect(transactionReceipt.status).to.eql(1);
        });

        it('tokens balance should increase by at least minAmountsOut', async () => {
          for (let i = 0; i < tokensBalanceAfter.length; i++) {
            expect(
              tokensBalanceAfter[i]
                .sub(tokensBalanceBefore[i])
                .gte(tokensMinBalanceIncrease[i])
            ).to.be.true;
          }
        });

        it('bpt balance should decrease by max bptMaxBalanceDecrease', async () => {
          expect(
            bptBalanceBefore.sub(bptBalanceAfter).eq(bptMaxBalanceDecrease)
          ).to.be.true;
        });
      });

      context('params', async () => {
        before(async function () {
          this.timeout(20000);
          [bptBalanceBefore, ...tokensBalanceBefore] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );

          const { attributes, minAmountsOut, maxBPTIn } =
            pool.buildExitExactBPTIn(signerAddress, bptIn, slippage);

          bptMaxBalanceDecrease = BigNumber.from(maxBPTIn);
          tokensMinBalanceIncrease = minAmountsOut.map((a) =>
            BigNumber.from(a)
          );

          const transactionResponse = await balancer.contracts.vault
            .connect(signer)
            .exitPool(
              attributes.poolId,
              attributes.sender,
              attributes.recipient,
              attributes.exitPoolRequest
            );
          transactionReceipt = await transactionResponse.wait();
          [bptBalanceAfter, ...tokensBalanceAfter] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );
        });

        it('should work', async () => {
          expect(transactionReceipt.status).to.eql(1);
        });

        it('tokens balance should increase by at least minAmountsOut', async () => {
          for (let i = 0; i < tokensBalanceAfter.length; i++) {
            expect(
              tokensBalanceAfter[i]
                .sub(tokensBalanceBefore[i])
                .gte(tokensMinBalanceIncrease[i])
            ).to.be.true;
          }
        });

        it('bpt balance should decrease by max bptMaxBalanceDecrease', async () => {
          expect(
            bptBalanceBefore.sub(bptBalanceAfter).eq(bptMaxBalanceDecrease)
          ).to.be.true;
        });
      });
    });

    context('exitExactTokensOut', async () => {
      const amountsOutDiv = '100000000';
      let maxBPTIn: string;
      context('encoded data', async () => {
        before(async function () {
          this.timeout(20000);
          [bptBalanceBefore, ...tokensBalanceBefore] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );

          amountsOut = pool.tokens.map((t) =>
            parseFixed(t.balance, t.decimals).div(amountsOutDiv).toString()
          );
          const attributes = await pool.buildExitExactTokensOut(
            signerAddress,
            tokensOut.map((t) => t.address),
            amountsOut,
            slippage
          );
          maxBPTIn = attributes.maxBPTIn;
          const tx = { to: attributes.to, data: attributes.data };
          const transactionResponse = await signer.sendTransaction(tx);
          transactionReceipt = await transactionResponse.wait();
          [bptBalanceAfter, ...tokensBalanceAfter] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );
        });

        it('should work', async () => {
          expect(transactionReceipt.status).to.eql(1);
        });

        it('tokens balance should increase by exact amounts out', async () => {
          for (let i = 0; i < tokensBalanceAfter.length; i++) {
            expect(
              tokensBalanceAfter[i]
                .sub(tokensBalanceBefore[i])
                .eq(amountsOut[i])
            ).to.be.true;
          }
        });

        it('bpt balance should decrease by max maxBPTIn', async () => {
          expect(bptBalanceBefore.sub(bptBalanceAfter).lte(maxBPTIn)).to.be
            .true;
        });
      });

      context('params', async () => {
        before(async function () {
          this.timeout(20000);
          [bptBalanceBefore, ...tokensBalanceBefore] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );

          amountsOut = pool.tokens.map((t) =>
            parseFixed(t.balance, t.decimals).div(amountsOutDiv).toString()
          );
          const exitPool = await pool.buildExitExactTokensOut(
            signerAddress,
            tokensOut.map((t) => t.address),
            amountsOut,
            slippage
          );
          maxBPTIn = exitPool.maxBPTIn;
          const transactionResponse = await balancer.contracts.vault
            .connect(signer)
            .exitPool(
              exitPool.attributes.poolId,
              exitPool.attributes.sender,
              exitPool.attributes.recipient,
              exitPool.attributes.exitPoolRequest
            );
          transactionReceipt = await transactionResponse.wait();
          [bptBalanceAfter, ...tokensBalanceAfter] = await updateBalances(
            pool,
            signer,
            signerAddress,
            balancer
          );
        });

        it('should work', async () => {
          expect(transactionReceipt.status).to.eql(1);
        });

        it('tokens balance should increase by exact amounts out', async () => {
          for (let i = 0; i < tokensBalanceAfter.length; i++) {
            expect(
              tokensBalanceAfter[i]
                .sub(tokensBalanceBefore[i])
                .eq(amountsOut[i])
            ).to.be.true;
          }
        });

        it('bpt balance should decrease', async () => {
          expect(bptBalanceBefore.sub(bptBalanceAfter).lte(maxBPTIn)).to.be
            .true;
        });
      });
    });
  }).timeout(20000);
};

// Test Scenarios

// testExitPool(
//   '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e' // B_50WBTC_50WETH
// );

// testExitPool(
//   '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014' // Balancer 80 BAL 20 WETH
// );

testExitPool(
  '0xc45d42f801105e861e86658648e3678ad7aa70f900010000000000000000011e' // 50OHM-25DAI-25WETH
);
