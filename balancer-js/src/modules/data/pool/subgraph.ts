import { Findable } from '../types';
import {
  createSubgraphClient,
  SubgraphClient,
  SubgraphPool,
  Pool_OrderBy,
  OrderDirection,
} from '@/modules/subgraph/subgraph';
import { PoolAttribute } from './types';
import { Pool, PoolType } from '@/types';

/**
 * Access pools using generated subgraph client.
 *
 * Balancer's subgraph URL: https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-v2
 */
export class PoolsSubgraphRepository implements Findable<Pool, PoolAttribute> {
  private client: SubgraphClient;
  public pools: SubgraphPool[] = [];

  constructor(url: string) {
    this.client = createSubgraphClient(url);
  }

  async fetch(): Promise<SubgraphPool[]> {
    const { pool0, pool1000 } = await this.client.Pools({
      where: { swapEnabled: true, totalShares_gt: '0' },
      orderBy: Pool_OrderBy.TotalLiquidity,
      orderDirection: OrderDirection.Desc,
    });

    // TODO: how to best convert subgraph type to sdk internal type?
    this.pools = [...pool0, ...pool1000];

    return this.pools;
  }

  async find(id: string): Promise<Pool | undefined> {
    if (this.pools.length == 0) {
      await this.fetch();
    }

    return this.findBy('id', id);
  }

  async findBy(param: PoolAttribute, value: string): Promise<Pool | undefined> {
    if (this.pools.length == 0) {
      await this.fetch();
    }

    const pool = this.pools.find((pool) => pool[param] == value);
    if (pool) {
      return this.mapType(pool);
    }
    return undefined;
  }

  // async where(filters: Map<PoolAttribute, string>): Promise<Pool[]> {
  //   if (this.pools.length == 0) {
  //     await this.fetch();
  //   }
  //   const applyFilters = (pool: SubgraphPool) => {

  //   }

  //   const pools = this.pools.filter((pool) => {
  //     filters.
  //   });
  // }

  private mapType(subgraphPool: SubgraphPool): Pool {
    return {
      id: subgraphPool.id,
      address: subgraphPool.address,
      poolType: subgraphPool.poolType as PoolType,
      swapFee: subgraphPool.swapFee,
      // owner: subgraphPool.owner,
      // factory: subgraphPool.factory,
      tokens: subgraphPool.tokens || [],
      tokensList: subgraphPool.tokensList,
      tokenAddresses: (subgraphPool.tokens || []).map((t) => t.address),
      totalLiquidity: subgraphPool.totalLiquidity,
      totalShares: subgraphPool.totalShares,
      totalSwapFee: subgraphPool.totalSwapFee,
      totalSwapVolume: subgraphPool.totalSwapVolume,
      // onchain: subgraphPool.onchain,
      createTime: subgraphPool.createTime,
      // mainTokens: subgraphPool.mainTokens,
      // wrappedTokens: subgraphPool.wrappedTokens,
      // unwrappedTokens: subgraphPool.unwrappedTokens,
      // isNew: subgraphPool.isNew,
      // volumeSnapshot: subgraphPool.volumeSnapshot,
      // feesSnapshot: subgraphPool.feesSnapshot,
      // boost: subgraphPool.boost,
    };
  }
}
