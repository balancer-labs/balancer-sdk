import { StablePhantomPoolLiquidity } from './concerns/stablePhantom/liquidity.concern';
import { StablePhantomPoolSpotPrice } from './concerns/stablePhantom/spotPrice.concern';
import { PhantomStablePriceImpact } from './concerns/stablePhantom/priceImpact.concern';
import { PoolType } from './pool-type.interface';
import { StablePhantomPoolJoin } from './concerns/stablePhantom/join.concern';
import {
  JoinConcern,
  PriceImpactConcern,
  LiquidityConcern,
  SpotPriceConcern,
} from './concerns/types';

export class StablePhantom implements PoolType {
  public liquidity: LiquidityConcern;
  public spotPriceCalculator: SpotPriceConcern;
  public priceImpactCalculator: PriceImpactConcern;
  public join: JoinConcern;

  constructor(
    private liquidityConcern = StablePhantomPoolLiquidity,
    private spotPriceCalculatorConcern = StablePhantomPoolSpotPrice,
    private priceImpactCalculatorConcern = PhantomStablePriceImpact,
    public joinConcern = StablePhantomPoolJoin
  ) {
    this.liquidity = new this.liquidityConcern();
    this.spotPriceCalculator = new this.spotPriceCalculatorConcern();
    this.priceImpactCalculator = new this.priceImpactCalculatorConcern();
    this.join = new this.joinConcern();
  }
}
