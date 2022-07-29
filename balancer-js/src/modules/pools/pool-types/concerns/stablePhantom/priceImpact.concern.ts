import { PhantomStablePool, SubgraphPoolBase } from '@balancer-labs/sor';
import { cloneDeep } from 'lodash';
import { PriceImpactConcern } from '@/modules/pools/pool-types/concerns/types';
import { parseToBigInt18 } from '@/lib/utils/math';
import { calcPriceImpact } from '@/modules/pricing/priceImpact';
import {
  ONE,
  BZERO,
  _computeScalingFactor,
  _upscale,
  SolidityMaths,
} from '@/lib/utils/solidityMaths';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';
import { bptSpotPrice } from '../stable/priceImpact.concern';
import { Pool } from '@/types';

export class PhantomStablePriceImpact implements PriceImpactConcern {
  /**
   * Calculates the BPT return amount when investing with no price impact.
   * @param { SubgraphPoolBase } pool Investment pool.
   * @param { bigint [] } amounts Token amounts being invested. Needs a value for each pool token that is not a PhantomBpt.
   * @returns { bigint } BPT amount.
   */
  bptZeroPriceImpact(pool: Pool, tokenAmounts: bigint[]): bigint {
    if (tokenAmounts.length !== pool.tokensList.length - 1)
      throw new BalancerError(BalancerErrorCode.ARRAY_LENGTH_MISMATCH);

    // upscales amp, swapfee, totalshares
    const phantomStablePool = PhantomStablePool.fromPool(
      pool as SubgraphPoolBase
    );
    const tokensList = cloneDeep(pool.tokensList);
    const bptIndex = tokensList.findIndex((token) => token == pool.address);
    tokensList.splice(bptIndex, 1);
    if (tokenAmounts.length !== tokensList.length)
      throw new BalancerError(BalancerErrorCode.ARRAY_LENGTH_MISMATCH);
    const totalShares = BigInt(phantomStablePool.totalShares.toString());
    const balances = phantomStablePool.tokens.map((token) =>
      parseToBigInt18(token.balance)
    );
    balances.splice(bptIndex, 1);
    const priceRates = phantomStablePool.tokens.map((token) =>
      parseToBigInt18(token.priceRate)
    );
    const balancesScaled = balances.map((balance, i) =>
      SolidityMaths.mulDownFixed(balance, priceRates[i])
    );
    let bptZeroPriceImpact = BZERO;
    for (let i = 0; i < tokensList.length; i++) {
      const price =
        (bptSpotPrice(
          phantomStablePool.amp.toBigInt(), // this already includes the extra digits from precision
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
