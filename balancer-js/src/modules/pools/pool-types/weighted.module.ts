import { WeightedPoolLiquidity } from './concerns/weighted/liquidity.concern';
import { WeightedPoolSpotPrice } from './concerns/weighted/spotPrice.concern';
import { WeightedPoolPriceImpact } from './concerns/weighted/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import { WeightedPoolJoin } from './concerns/weighted/join.concern';
import {
  JoinConcern,
  LiquidityConcern,
  PriceImpactConcern,
  SpotPriceConcern,
} from './concerns/types';

export class Weighted implements PoolType {
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;
  public join: JoinConcern;

  constructor(
    private liquidityConcern = WeightedPoolLiquidity,
    private spotPriceCalculatorConcern = WeightedPoolSpotPrice,
    private priceImpactCalculatorConcern = WeightedPoolPriceImpact,
    private joinConcern = WeightedPoolJoin
  ) {
    this.liquidity = new this.liquidityConcern();
    this.spotPriceCalculator = new this.spotPriceCalculatorConcern();
    this.priceImpactCalculator = new this.priceImpactCalculatorConcern();
    this.join = new this.joinConcern();
  }
}
