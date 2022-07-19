import { BalancerSdkConfig, BalancerNetworkConfig } from '@/types';
import { Swaps } from './swaps/swaps.module';
import { Relayer } from './relayer/relayer.module';
import { Subgraph } from './subgraph/subgraph.module';
import { Sor } from './sor/sor.module';
import { getNetworkConfig } from './sdk.helpers';
import { Pricing } from './pricing/pricing.module';
import { ContractInstances, Contracts } from './contracts/contracts.module';
import { Pools } from './pools';
import {
  CoingeckoPriceRepository,
  LiquidityGaugeSubgraphRPCProvider,
  PoolsSubgraphRepository,
  StaticTokenProvider,
  FeeDistributorRepository,
  FeeCollectorRepository,
  TokenYieldsRepository,
} from './data';

export interface BalancerSDKRoot {
  config: BalancerSdkConfig;
  sor: Sor;
  subgraph: Subgraph;
  pools: Pools;
  swaps: Swaps;
  relayer: Relayer;
  networkConfig: BalancerNetworkConfig;
}

export class BalancerSDK implements BalancerSDKRoot {
  readonly swaps: Swaps;
  readonly relayer: Relayer;
  readonly pricing: Pricing;
  readonly pools: Pools;
  balancerContracts: Contracts;

  constructor(
    public config: BalancerSdkConfig,
    public sor = new Sor(config),
    public subgraph = new Subgraph(config)
  ) {
    const networkConfig = getNetworkConfig(config);
    const repositories = {
      pools: new PoolsSubgraphRepository(networkConfig.urls.subgraph),
      tokenPrices: new CoingeckoPriceRepository([], networkConfig.chainId),
      tokenMeta: new StaticTokenProvider([]),
      liquidityGauges: new LiquidityGaugeSubgraphRPCProvider(
        networkConfig.urls.gaugesSubgraph,
        networkConfig.addresses.contracts.multicall,
        networkConfig.addresses.contracts.gaugeController,
        sor.provider
      ),
      feeDistributor: new FeeDistributorRepository(
        networkConfig.addresses.contracts.multicall,
        networkConfig.addresses.contracts.feeDistributor,
        networkConfig.addresses.tokens.bal,
        networkConfig.addresses.tokens.veBal,
        networkConfig.addresses.tokens.bbaUsd,
        sor.provider
      ),
      feeCollector: new FeeCollectorRepository(
        networkConfig.addresses.contracts.vault,
        sor.provider
      ),
      tokenYields: new TokenYieldsRepository(),
    };

    this.swaps = new Swaps(this.config);
    this.relayer = new Relayer(this.swaps);
    this.pricing = new Pricing(config, this.swaps);
    this.pools = new Pools(networkConfig, repositories);

    this.balancerContracts = new Contracts(
      networkConfig.addresses.contracts,
      sor.provider
    );
  }

  get networkConfig(): BalancerNetworkConfig {
    return getNetworkConfig(this.config);
  }

  /**
   * Expose balancer contracts, e.g. Vault, LidoRelayer.
   */
  get contracts(): ContractInstances {
    return this.balancerContracts.contracts;
  }
}
