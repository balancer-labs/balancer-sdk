import { BalancerSdkConfig, Pool, PoolModel } from '@/types';
import { PoolRepository } from '@/modules/data';
import { Pools as PoolMethods } from './pools.module';
import { getNetworkConfig } from '../sdk.helpers';

/**
 * Building pools from raw data injecting poolType specific methods
 */
export class PoolsProvider {
  constructor(
    private config: BalancerSdkConfig,
    private repository: PoolRepository
  ) {}

  static wrap(data: Pool, config: BalancerSdkConfig): PoolModel {
    const methods = PoolMethods.from(data.poolType);
    const networkConfig = getNetworkConfig(config);
    return {
      ...data,
      liquidity: async () => methods.liquidity.calcTotal(data.tokens),
      buildJoin: (joiner, tokensIn, amountsIn, slippage) =>
        methods.join.buildJoin({
          joiner,
          pool: data,
          tokensIn,
          amountsIn,
          slippage,
          wrappedNativeAsset: networkConfig.addresses.tokens.wrappedNativeAsset,
        }),

      // TODO: spotPrice fails, because it needs a subgraphType,
      // either we refetch or it needs a type transformation from SDK internal to SOR (subgraph)
      // spotPrice: async (tokenIn: string, tokenOut: string) =>
      //   methods.spotPriceCalculator.calcPoolSpotPrice(tokenIn, tokenOut, data),
    };
  }

  async find(id: string): Promise<PoolModel | undefined> {
    const data = await this.repository.find(id);
    if (!data) return;

    return PoolsProvider.wrap(data, this.config);
  }

  async findBy(param: string, value: string): Promise<PoolModel | undefined> {
    if (param == 'id') {
      return this.find(value);
    } else if (param == 'address') {
      const data = await this.repository.findBy('address', value);
      if (!data) return;

      return PoolsProvider.wrap(data, this.config);
    } else {
      throw `search by ${param} not implemented`;
    }
  }
}
