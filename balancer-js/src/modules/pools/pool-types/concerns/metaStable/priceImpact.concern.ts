import { cloneDeep } from 'lodash';
import { MetaStablePool, SubgraphPoolBase } from '@balancer-labs/sor';
import { PriceImpactConcern } from '@/modules/pools/pool-types/concerns/types';
import { parseToBigInt18 } from '@/lib/utils/math';
import { bptSpotPrice } from '@/modules/pools/pool-types/concerns/stable/priceImpact.concern';
import { calcPriceImpact } from '@/modules/pricing/priceImpact';
import {
  ONE,
  BZERO,
  SolidityMaths,
  _upscale,
  _computeScalingFactor,
} from '@/lib/utils/solidityMaths';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import { Pool } from '@/types';

export class MetaStablePoolPriceImpact implements PriceImpactConcern {
  /**
   * Calculates the BPT return amount when investing with no price impact.
   * @param { SubgraphPoolBase } pool Investment pool.
   * @param { string [] } amounts Token amounts being invested. Needs a value for each pool token.
   * @returns { string } BPT amount.
   */
  bptZeroPriceImpact(pool: Pool, tokenAmounts: bigint[]): bigint {
    if (tokenAmounts.length !== pool.tokensList.length)
      throw new BalancerError(BalancerErrorCode.ARRAY_LENGTH_MISMATCH);

    // upscales amp, swapfee, totalshares
    const metaStablePool = MetaStablePool.fromPool(pool as SubgraphPoolBase);
    const tokensList = cloneDeep(pool.tokensList);
    const totalShares = BigInt(metaStablePool.totalShares.toString());
    const balances = metaStablePool.tokens.map((token) =>
      parseToBigInt18(token.balance)
    );
    const priceRates = metaStablePool.tokens.map((token) =>
      parseToBigInt18(token.priceRate)
    );
    const balancesScaled = balances.map((balance, i) =>
      SolidityMaths.mulDownFixed(balance, priceRates[i])
    );
    let bptZeroPriceImpact = BZERO;
    for (let i = 0; i < tokensList.length; i++) {
      const price =
        (bptSpotPrice(
          metaStablePool.amp.toBigInt(), // this already includes the extra digits from precision
          balancesScaled,
          totalShares,
          i
        ) *
          priceRates[i]) /
        ONE;
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
