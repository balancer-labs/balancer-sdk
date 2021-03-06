import { WeightedPoolLiquidity } from './concerns/weighted/liquidity.concern';
import { WeightedPoolSpotPrice } from './concerns/weighted/spotPrice.concern';
import { WeightedPoolJoin } from './concerns/weighted/join.concern';
import { PoolType } from './pool-type.interface';
import {
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Weighted implements PoolType {
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public join: JoinConcern;

  constructor(
    private liquidityConcern = WeightedPoolLiquidity,
    private spotPriceCalculatorConcern = WeightedPoolSpotPrice,
    private joinConcern = WeightedPoolJoin
  ) {
    this.liquidity = new this.liquidityConcern();
    this.spotPriceCalculator = new this.spotPriceCalculatorConcern();
    this.join = new this.joinConcern();
  }
}
