import { ONE, SolidityMaths } from '@/lib/utils/solidityMaths';

export function calcPriceImpact(
  bptAmount: bigint,
  bptZeroPriceImpact: bigint
): bigint {
  // 1 - (bptAmount/bptZeroPI)
  return ONE - SolidityMaths.divDownFixed(bptAmount, bptZeroPriceImpact);
}
