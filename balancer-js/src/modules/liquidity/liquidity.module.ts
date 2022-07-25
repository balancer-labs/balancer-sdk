import { BigNumber as OldBigNumber } from 'bignumber.js';
import { parseFixed } from '@/lib/utils/math';
import { Pool, PoolToken } from '@/types';
import { Pools } from '@/modules/pools/pools.module';
import { PoolRepository } from '../data';
import { TokenPriceProvider } from '../data';

const TOKEN_WEIGHT_SCALING_FACTOR = 18;

export interface PoolBPTValue {
  address: string;
  liquidity: string;
}

export class Liquidity {
  constructor(
    private pools: PoolRepository,
    private tokenPrices: TokenPriceProvider
  ) {}

  async getLiquidity(pool: Pool): Promise<string> {
    // Remove any tokens with same address as pool as they are pre-printed BPT
    const parsedTokens = pool.tokens.filter((token) => {
      return token.address !== pool.address;
    });

    // For all tokens that are pools, recurse into them and fetch their liquidity
    const subPoolLiquidity: (PoolBPTValue | undefined)[] = await Promise.all(
      parsedTokens.map(async (token) => {
        const pool = await this.pools.findBy('address', token.address);
        if (!pool) return;

        const liquidity = new OldBigNumber(await this.getLiquidity(pool));
        const totalBPT = new OldBigNumber(pool.totalShares);
        const bptValue = liquidity.div(totalBPT);

        const bptInParentPool = new OldBigNumber(token.balance);
        const liquidityInParentPool = bptValue.times(bptInParentPool);

        return {
          address: pool.address,
          liquidity: liquidityInParentPool.toString(),
        };
      })
    );

    const totalSubPoolLiquidity = subPoolLiquidity.reduce(
      (totalLiquidity, subPool) => {
        if (!subPool) return new OldBigNumber(0);
        return totalLiquidity.plus(subPool.liquidity);
      },
      new OldBigNumber(0)
    );

    const nonPoolTokens = parsedTokens.filter((token) => {
      return !subPoolLiquidity.find((pool) => pool?.address === token.address);
    });

    const tokenBalances: PoolToken[] = await Promise.all(
      nonPoolTokens.map(async (token) => {
        const tokenPrice = await this.tokenPrices.find(token.address);
        const poolToken: PoolToken = {
          address: token.address,
          decimals: token.decimals,
          priceRate: token.priceRate,
          price: tokenPrice,
          balance: token.balance,
          weight: token.weight
            ? parseFixed(token.weight, TOKEN_WEIGHT_SCALING_FACTOR).toString()
            : '0',
        };
        return poolToken;
      })
    );

    const tokenLiquidity = Pools.from(pool.poolType).liquidity.calcTotal(
      tokenBalances
    );

    const totalLiquidity = new OldBigNumber(totalSubPoolLiquidity).plus(
      tokenLiquidity
    );

    return totalLiquidity.toString();
  }
}
