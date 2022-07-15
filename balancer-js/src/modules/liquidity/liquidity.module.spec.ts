import { StaticPoolRepository } from '../data';
import { Pool } from '@/types';
import { expect } from 'chai';
import { Liquidity } from './liquidity.module';
import pools from '@/test/fixtures/liquidityPools.json';
import tokenPrices from '@/test/fixtures/liquidityTokenPrices.json';
import { StaticTokenPriceProvider } from '../data';
import { formatFixed, parseFixed } from '@ethersproject/bignumber';

const tokenPriceProvider = new StaticTokenPriceProvider(tokenPrices);
const poolProvider = new StaticPoolRepository(pools as Pool[]);

let liquidityProvider: Liquidity;

beforeEach(() => {
  liquidityProvider = new Liquidity(poolProvider, tokenPriceProvider);
});

function findPool(address: string): Pool {
  const pool = pools.find((pool) => {
    return pool.address === address;
  });
  if (!pool) throw new Error('Could not find test pool of address: ' + address);
  return pool as Pool;
}

describe('Liquidity Module', () => {
  context('Weighted Pool Calculations', () => {
    it('Correct calculates liquidity of a 50/50 WBTC/WETH pool', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0xa6f548df93de924d73be7d25dc02554c6bd66db5')
      );
      expect(liquidity).to.be.eq('640000');
    });

    it('Correct calculates liquidity of a 60/40 pool', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0xc6a5032dc4bf638e15b4a66bc718ba7ba474ff73')
      );
      expect(liquidity).to.be.eq('10000');
    });

    it('Correctly calculates value of a 25/25/25/25 pool which is slightly imbalanced', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0xd8833594420db3d6589c1098dbdd073f52419dba')
      );
      expect(liquidity).to.be.eq('127080');
    });

    it('Should return 0 liquidity with no errors when all prices are undefined', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0x062f38735aac32320db5e2dbbeb07968351d7c72')
      );
      expect(liquidity).to.be.eq('0');
    });

    it('Should approximate liquidity when some prices are unknown', async () => {
      const pool = findPool('0x996616bde0cb4974e571f17d31c844da2bd177f8');
      const liquidity = await liquidityProvider.getLiquidity(pool);
      const wethAddress = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1';
      const wethBalance =
        pool.tokens.find((token) => token.address === wethAddress)?.balance ||
        '0';
      const wethPrice = tokenPrices[wethAddress].usd;
      const expectedLiquidity = parseFixed(wethBalance, 18)
        .mul(parseFixed(wethPrice, 0))
        .mul('2');
      expect(liquidity).to.be.eq(formatFixed(expectedLiquidity, 18));
    });
  });

  context('Stable Pool calculations', () => {
    it('Correctly calculates value of a USD 3pool', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0x06df3b2bbb68adc8b0e302443692037ed9f91b42')
      );
      expect(liquidity).to.be.eq('130524319.23');
    });

    it('Correctly calculates the liquidity of a 3pool with a missing price', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0x000f3b2bbb68adc8b0e302443692037ed9f91b42')
      );
      expect(liquidity).to.be.eq('130304713.065278948964422831');
    });
  });

  context('Metastable Pool calculations', () => {
    it('Correct calculates liquidity of a wstETH/ETH metastable pool', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0x32296969ef14eb0c6d29669c550d4a0449130230')
      );
      expect(liquidity).to.be.eq('154558160');
    });
  });

  context('PhantomStable Pool calculations', () => {
    it('Correctly calculates liquidity of a Boosted USD 3pool', async () => {
      const liquidity = await liquidityProvider.getLiquidity(
        findPool('0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2')
      );
      expect(Number(liquidity).toFixed(8).toString()).to.be.eq(
        '176802743.05530426'
      );
    });
  });
});
