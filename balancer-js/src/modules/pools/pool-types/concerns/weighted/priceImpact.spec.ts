import dotenv from 'dotenv';
import { expect } from 'chai';
import { WeightedPoolPriceImpact } from '@/modules/pools/pool-types/concerns/weighted/priceImpact.concern';
import pools_14717479 from '@/test/lib/pools_14717479.json';
import { StaticPoolRepository } from '@/modules/data';
import { PoolsProvider } from '@/modules/pools/provider';
import { PoolModel, Pool } from '@/types';
import { Network } from '@/.';

dotenv.config();

const rpcUrl = 'http://127.0.0.1:8545';

const priceImpactCalc = new WeightedPoolPriceImpact();
const wethDaiId =
  '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a';
const threeTokensPoolId =
  '0xb39362c3d5ac235fe588b0b83ed7ac87241039cb000100000000000000000195';

// Setup
const setupPool = async (provider: PoolsProvider, poolId: string) => {
  const _pool = await provider.find(poolId);
  if (!_pool) throw new Error('Pool not found');
  const pool = _pool;
  return pool;
};

describe('weighted pool price impact', () => {
  let pool: PoolModel;
  let threeTokensPool: PoolModel;

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
    pool = await setupPool(poolsProvider, wethDaiId);
    threeTokensPool = await setupPool(poolsProvider, threeTokensPoolId);
  });

  context('bpt zero price impact', () => {
    it('two token pool', () => {
      const tokenAmounts = [
        BigInt('10000000000000000000'),
        BigInt('100000000000000000000'),
      ];

      const bptZeroPriceImpact = priceImpactCalc.bptZeroPriceImpact(
        pool,
        tokenAmounts
      );
      expect(bptZeroPriceImpact.toString()).to.eq('2362847643421361281550');

      const proportionalTokenAmounts = [
        BigInt('244477477399253547632406'),
        BigInt('125240456379058423162'),
      ];
      const proportionalBptZeroPI = priceImpactCalc.bptZeroPriceImpact(
        pool,
        proportionalTokenAmounts
      );
      expect(proportionalBptZeroPI.toString()).to.eq('4931900186642428185328');
    });
    it('three token pool', () => {
      const tokenAmounts = [
        BigInt('10234000000000000000'),
        BigInt('23420000000000000'),
        BigInt('2000000000000000000000'),
      ];

      const bptZeroPriceImpact = priceImpactCalc.bptZeroPriceImpact(
        threeTokensPool,
        tokenAmounts
      );
      expect(bptZeroPriceImpact.toString()).to.eq('876361770363362937782');

      const proportionalTokenAmounts = [
        BigInt('2008674590910876751911'),
        BigInt('1980591720094174457'),
        BigInt('383499316375739080555'),
      ];
      const proportionalBptZeroPI = priceImpactCalc.bptZeroPriceImpact(
        threeTokensPool,
        proportionalTokenAmounts
      );
      expect(proportionalBptZeroPI.toString()).to.eq('279707470176761335097');
    });
  });

  context('price impact', () => {
    it('calculate price impact', () => {
      const proportionalTokenAmounts = [
        '244477477399253547632406',
        '125240456379058423162',
      ];
      const priceImpact = priceImpactCalc.calcPriceImpact(
        pool,
        proportionalTokenAmounts,
        '4931900186642428185328'
      );
      expect(priceImpact.toString()).to.eq('0');
    });
  });
});
