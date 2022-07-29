import { StablePoolExit } from './concerns/stable/exit.concern';
import { StablePoolJoin } from './concerns/stable/join.concern';
import { StablePoolLiquidity } from './concerns/stable/liquidity.concern';
import { StablePoolSpotPrice } from './concerns/stable/spotPrice.concern';
import { PoolType } from './pool-type.interface';
import {
  ExitConcern,
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Stable implements PoolType {
  constructor(
    public exit: ExitConcern = new StablePoolExit(),
    public join: JoinConcern = new StablePoolJoin(),
    public liquidity: LiquidityConcern = new StablePoolLiquidity(),
    public spotPriceCalculator: SpotPriceConcern = new StablePoolSpotPrice()
  ) {}
}
