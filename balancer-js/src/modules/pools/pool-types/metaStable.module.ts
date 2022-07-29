import { MetaStablePoolLiquidity } from './concerns/metaStable/liquidity.concern';
import { MetaStablePoolSpotPrice } from './concerns/metaStable/spotPrice.concern';
import { MetaStablePoolPriceImpact } from './concerns/metaStable/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import {
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
  PriceImpactConcern,
} from './concerns/types';
import { MetaStablePoolJoin } from './concerns/metaStable/join.concern';

export class MetaStable implements PoolType {
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;
  public join: JoinConcern;

  constructor(
    private liquidityConcern = MetaStablePoolLiquidity,
    private spotPriceCalculatorConcern = MetaStablePoolSpotPrice,
    private priceImpactCalculatorConcern = MetaStablePoolPriceImpact,
    private joinConcern = MetaStablePoolJoin
  ) {
    this.liquidity = new this.liquidityConcern();
    this.spotPriceCalculator = new this.spotPriceCalculatorConcern();
    this.join = new this.joinConcern();
    this.priceImpactCalculator = new this.priceImpactCalculatorConcern();
  }
}
