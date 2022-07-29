import dotenv from 'dotenv';
import { expect } from 'chai';
import { MetaStablePoolPriceImpact } from '@/modules/pools/pool-types/concerns/metaStable/priceImpact.concern';
import pools_14717479 from '@/test/lib/pools_14717479.json';
import { PoolsProvider } from '@/modules/pools/provider';
import { StaticPoolRepository } from '@/modules/data';
import { PoolModel, Pool } from '@/types';
import { Network } from '@/.';

dotenv.config();

const rpcUrl = 'http://127.0.0.1:8545';

const priceImpactCalc = new MetaStablePoolPriceImpact();
const wstETHwETH =
  '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080';

// Setup
const setupPool = async (provider: PoolsProvider, poolId: string) => {
  const _pool = await provider.find(poolId);
  if (!_pool) throw new Error('Pool not found');
  const pool = _pool;
  return pool;
};

describe('metastable pool price impact', () => {
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
    pool = await setupPool(poolsProvider, wstETHwETH);
  });

  const tokenAmounts = [
    BigInt('629870162919981039400158'),
    BigInt('615159929697'),
  ];
  context('bpt zero price impact', () => {
    it('test1', () => {
      const bptZeroPriceImpact = priceImpactCalc.bptZeroPriceImpact(
        pool,
        tokenAmounts
      );
      expect(bptZeroPriceImpact.toString()).to.eq('662816325116386208862285');
    });
    it('test2', () => {
      // This tokenAmounts vector is proportional to the balances
      // so that the correct return value is totalShares times the
      // proportionality constant, equal to 0.01
      const proportionalTokenAmounts = [
        BigInt('813913487516879908953'),
        BigInt('854410030026808373669'),
      ];

      const bptZeroPriceImpact = priceImpactCalc.bptZeroPriceImpact(
        pool,
        proportionalTokenAmounts
      );
      expect(bptZeroPriceImpact.toString()).to.eq('1696871032806568300470');
    });
  });

  context('price impact', () => {
    it('calculate price impact', () => {
      const priceImpact = priceImpactCalc.calcPriceImpact(
        pool,
        tokenAmounts.map((amount) => amount.toString()),
        '660816325116386208862285'
      );
      expect(priceImpact.toString()).to.eq('3017427187914862');
    });
  });
});
