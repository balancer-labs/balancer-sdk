import { BalancerSdkConfig } from '@/types';
import { Stable } from './pool-types/stable.module';
import { Weighted } from './pool-types/weighted.module';
import { MetaStable } from './pool-types/metaStable.module';
import { StablePhantom } from './pool-types/stablePhantom.module';
import { Linear } from './pool-types/linear.module';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';

export class Pools {
  constructor(
    config: BalancerSdkConfig,
    public weighted = new Weighted(),
    public stable = new Stable(),
    public metaStable = new MetaStable(),
    public stablePhantom = new StablePhantom(),
    public linear = new Linear()
  ) {}

  static from(
    poolType: string
  ): Weighted | Stable | MetaStable | StablePhantom | Linear {
    // Calculate spot price using pool type
    switch (poolType) {
      case 'Weighted':
      case 'Investment':
      case 'LiquidityBootstrapping': {
        return new Weighted();
      }
      case 'Stable': {
        return new Stable();
      }
      case 'MetaStable': {
        return new MetaStable();
      }
      case 'StablePhantom': {
        return new StablePhantom();
      }
      case 'AaveLinear':
      case 'ERC4626Linear': {
        return new Linear();
      }
      default:
        throw new BalancerError(BalancerErrorCode.UNSUPPORTED_POOL_TYPE);
    }
  }
}
