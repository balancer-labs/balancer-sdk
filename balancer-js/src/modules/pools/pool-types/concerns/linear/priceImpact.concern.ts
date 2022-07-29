/* eslint-disable @typescript-eslint/no-unused-vars */
import { PriceImpactConcern } from '../types';
import { Pool } from '@/types';

export class LinearPriceImpact implements PriceImpactConcern {
  bptZeroPriceImpact(pool: Pool, amounts: bigint[]): bigint {
    throw new Error('Linear Pool bptZeroPriceImpact Not Implented');
  }
  calcPriceImpact(
    pool: Pool,
    tokenAmounts: string[],
    bptAmount: string
  ): string {
    throw new Error('Linear Pool Price Impact Not Implented');
  }
}
