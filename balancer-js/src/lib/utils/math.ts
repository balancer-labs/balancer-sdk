import {
  BigNumber,
  BigNumberish,
  parseFixed as _parseFixed,
  formatFixed,
} from '@ethersproject/bignumber';

export function parseFixed(value: string, decimals?: BigNumberish): BigNumber {
  const valueWithTrimmedDecimals = new RegExp(`[0-9]+\\.?[0-9]{0,${decimals}}`);
  const result = value.match(valueWithTrimmedDecimals);
  let parsedValue = value;
  if (result) {
    parsedValue = result[0];
  }

  return _parseFixed(parsedValue, decimals);
}

export function parseToBigInt18(value: string): bigint {
  return parseFixed(value, 18).toBigInt();
}

export function formatFromBigInt18(value: bigint): string {
  return formatFixed(BigNumber.from(value), 18);
}
