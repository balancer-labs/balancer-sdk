import {
  JoinConcern,
  LiquidityConcern,
  SpotPriceConcern,
  PriceImpactConcern,
} from './concerns/types';

export interface PoolType {
  liquidity: LiquidityConcern;
  spotPriceCalculator: SpotPriceConcern;
  priceImpactCalculator: PriceImpactConcern;
  join: JoinConcern;
}
