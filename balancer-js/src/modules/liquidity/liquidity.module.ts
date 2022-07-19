import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { parseFixed } from '@/lib/utils/math';
import { Pool, PoolToken } from '@/types';
import { PoolTypeConcerns } from '@/modules/pools/pool-type-concerns';
import { PoolRepository } from '../data';
import { TokenPriceProvider } from '../data';
import { Zero } from '@ethersproject/constants';

const SCALING_FACTOR = 36;
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

        const liquidity = await this.getLiquidity(pool);
        const scaledLiquidity = parseFixed(liquidity, SCALING_FACTOR * 2);
        const totalBPT = parseFixed(pool.totalShares, SCALING_FACTOR);
        const bptValue = scaledLiquidity.div(totalBPT);

        const bptInParentPool = parseFixed(token.balance, SCALING_FACTOR);
        const liquidityInParentPool = formatFixed(
          bptValue.mul(bptInParentPool),
          SCALING_FACTOR
        ).replace(/\.[0-9]+/, ''); // strip trailing decimals, we don't need them as we're already scaled up by 1e36

        return {
          address: pool.address,
          liquidity: liquidityInParentPool,
        };
      })
    );

    const totalSubPoolLiquidity = subPoolLiquidity.reduce(
      (totalLiquidity, subPool) => {
        if (!subPool) return Zero;
        return totalLiquidity.add(subPool.liquidity);
      },
      Zero
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

    const tokenLiquidity = PoolTypeConcerns.from(
      pool.poolType
    ).liquidity.calcTotal(tokenBalances);

    const totalLiquidity = formatFixed(
      BigNumber.from(totalSubPoolLiquidity).add(
        parseFixed(tokenLiquidity, SCALING_FACTOR)
      ),
      SCALING_FACTOR
    );

    return totalLiquidity;
  }
}
