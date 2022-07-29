import { BalancerSdkConfig, BalancerNetworkConfig } from '@/types';
import { Swaps } from './swaps/swaps.module';
import { Relayer } from './relayer/relayer.module';
import { Subgraph } from './subgraph/subgraph.module';
import { Sor } from './sor/sor.module';
import { getNetworkConfig } from './sdk.helpers';
import { Pools } from './pools/pools.module';
import { Pricing } from './pricing/pricing.module';
import { ContractInstances, Contracts } from './contracts/contracts.module';
import { PoolsProvider } from './pools/provider';
import { SubgraphPoolRepository } from './data/pool/subgraph';
import { Zaps } from './zaps/zaps.module';

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
  balancerContracts: Contracts;
  zaps: Zaps;

  constructor(
    public config: BalancerSdkConfig,
    public sor = new Sor(config),
    public subgraph = new Subgraph(config),
    public pools = new Pools(config),
    public poolsProvider = new PoolsProvider(
      config,
      new SubgraphPoolRepository(subgraph.client)
    )
  ) {
    this.swaps = new Swaps(this.config);
    this.relayer = new Relayer(this.swaps);
    this.pricing = new Pricing(config, this.swaps);
    const networkConfig = getNetworkConfig(config);
    this.balancerContracts = new Contracts(
      networkConfig.addresses.contracts,
      sor.provider
    );
    this.zaps = new Zaps(networkConfig.chainId);
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
