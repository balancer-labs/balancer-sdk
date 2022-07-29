import { cloneDeep } from 'lodash';
import { SubgraphPoolBase, WeightedPool } from '@balancer-labs/sor';
import { PriceImpactConcern } from '@/modules/pools/pool-types/concerns/types';
import { parseToBigInt18 } from '@/lib/utils/math';
import { calcPriceImpact } from '@/modules/pricing/priceImpact';
import {
  ONE,
  BZERO,
  _computeScalingFactor,
  _upscale,
} from '@/lib/utils/solidityMaths';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import { Pool } from '@/types';

export class WeightedPoolPriceImpact implements PriceImpactConcern {
  /**
   * Calculates the BPT return amount when investing with no price impact.
   * @param { SubgraphPoolBase } pool Investment pool.
   * @param { bigint [] } amounts Token amounts being invested. EVM Scale. Needs a value for each pool token.
   * @returns { bigint } BPT amount.
   */
  bptZeroPriceImpact(pool: Pool, tokenAmounts: bigint[]): bigint {
    if (tokenAmounts.length !== pool.tokensList.length)
      throw new BalancerError(BalancerErrorCode.ARRAY_LENGTH_MISMATCH);

    // swapFee, totalShares, totalWeight all scaled up to 18 decimals
    const weightedPool = WeightedPool.fromPool(pool as SubgraphPoolBase);

    const totalShares = BigInt(weightedPool.totalShares.toString());

    const tokensList = cloneDeep(pool.tokensList);
    let bptZeroPriceImpact = BZERO;
    for (let i = 0; i < tokensList.length; i++) {
      const weight =
        (parseToBigInt18(weightedPool.tokens[i].weight) *
          weightedPool.totalWeight.toBigInt()) /
        ONE;
      const balance = parseToBigInt18(weightedPool.tokens[i].balance);
      const price = (weight * totalShares) / balance;
      const scalingFactor = _computeScalingFactor(
        BigInt(pool.tokens[i].decimals as number)
      );
      const amountUpscaled = _upscale(tokenAmounts[i], scalingFactor);
      const newTerm = (price * amountUpscaled) / ONE;
      bptZeroPriceImpact += newTerm;
    }
    return bptZeroPriceImpact;
  }

  calcPriceImpact(
    pool: Pool,
    tokenAmounts: string[],
    bptAmount: string
  ): string {
    const bptZeroPriceImpact = this.bptZeroPriceImpact(
      pool,
      tokenAmounts.map((a) => BigInt(a))
    );
    return calcPriceImpact(BigInt(bptAmount), bptZeroPriceImpact).toString();
  }
}
