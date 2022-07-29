import { StablePhantomPoolExit } from './concerns/stablePhantom/exit.concern';
import { StablePhantomPoolJoin } from './concerns/stablePhantom/join.concern';
import { StablePhantomPoolLiquidity } from './concerns/stablePhantom/liquidity.concern';
import { StablePhantomPoolSpotPrice } from './concerns/stablePhantom/spotPrice.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
} from './concerns/types';

export class StablePhantom implements PoolType {
  constructor(
    public exit: ExitConcern = new StablePhantomPoolExit(),
    public join: JoinConcern = new StablePhantomPoolJoin(),
    public liquidity: LiquidityConcern = new StablePhantomPoolLiquidity(),
    public spotPriceCalculator: SpotPriceConcern = new StablePhantomPoolSpotPrice()
  ) {}
}
