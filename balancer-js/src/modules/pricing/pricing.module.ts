import { Swaps } from '@/modules/swaps/swaps.module';
import { BalancerSdkConfig, PoolType } from '@/types';
import {
  SubgraphPoolBase,
  ZERO,
  parseToPoolsDict,
  getSpotPriceAfterSwapForPath,
} from '@balancer-labs/sor';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import { PoolTypeConcerns } from '@/modules/pools/pool-type-concerns';

export class Pricing {
  private readonly swaps: Swaps;
  private pools: PoolTypeConcerns;

  constructor(config: BalancerSdkConfig, swaps?: Swaps) {
    if (swaps) {
      this.swaps = swaps;
    } else {
      this.swaps = new Swaps(config);
    }
    this.pools = new PoolTypeConcerns(config);
  }

  /**
   * Retrieves pools using poolDataService.
   * @returns {boolean} Boolean indicating whether pools data was fetched correctly (true) or not (false).
   */
  async fetchPools(): Promise<boolean> {
    return this.swaps.fetchPools();
  }

  /**
   * Get currently saved pools list (fetched using fetchPools()).
   * @returns {SubgraphPoolBase[]} pools list.
   */
  public getPools(): SubgraphPoolBase[] {
    return this.swaps.getPools();
  }

  /**
   * Calculates Spot Price for a token pair - for specific pool if ID otherwise finds most liquid path and uses this as reference SP.
   * @param { string } tokenIn Token in address.
   * @param { string } tokenOut Token out address.
   * @param { string } poolId Optional - if specified this pool will be used for SP calculation.
   * @param { SubgraphPoolBase[] } pools Optional - Pool data. Will be fetched via dataProvider if not supplied.
   * @returns  { string } Spot price.
   */
  async getSpotPrice(
    tokenIn: string,
    tokenOut: string,
    poolId = '',
    pools: SubgraphPoolBase[] = []
  ): Promise<string> {
    // If pools list isn't supplied fetch it from swaps data provider
    if (pools.length === 0) {
      await this.fetchPools();
      pools = this.getPools();
    }

    // If a poolId isn't specified we find the path for the pair with the highest liquidity and use this as the ref SP
    if (poolId === '') {
      const poolsDict = parseToPoolsDict(pools, 0);
      // This creates all paths for tokenIn>Out ordered by liquidity
      const paths = this.swaps.sor.routeProposer.getCandidatePathsFromDict(
        tokenIn,
        tokenOut,
        0,
        poolsDict,
        4
      );

      if (paths.length === 0)
        throw new BalancerError(BalancerErrorCode.UNSUPPORTED_PAIR);
      return getSpotPriceAfterSwapForPath(paths[0], 0, ZERO).toString();
    } else {
      // Find pool of interest from pools list
      const poolData = pools.find(
        (p) => p.id.toLowerCase() === poolId.toLowerCase()
      );
      if (!poolData)
        throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
      const pool = PoolTypeConcerns.from(poolData.poolType as PoolType);
      return pool.spotPriceCalculator.calcPoolSpotPrice(
        tokenIn,
        tokenOut,
        poolData
      );
    }
  }
}
