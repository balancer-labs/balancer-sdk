export enum BalancerErrorCode {
  SWAP_ZERO_RETURN_AMOUNT = 'SWAP_ZERO_RETURN_AMOUNT',
  UNWRAP_ZERO_AMOUNT = 'UNWRAP_ZERO_AMOUNT',
  WRAP_ZERO_AMOUNT = 'WRAP_ZERO_AMOUNT',
  QUERY_BATCH_SWAP = 'QUERY_BATCH_SWAP',
  POOL_DOESNT_EXIST = 'POOL_DOESNT_EXIST',
  UNSUPPORTED_POOL_TYPE = 'UNSUPPORTED_POOL_TYPE',
  UNSUPPORTED_PAIR = 'UNSUPPORTED_PAIR',
  NO_POOL_DATA = 'NO_POOL_DATA',
  ARRAY_LENGTH_MISMATCH = 'ARRAY_LENGTH_MISMATCH',
  INPUT_LENGTH_MISMATCH = 'INPUT_LENGTH_MISMATCH',
  MISSING_AMP = 'MISSING_AMP',
  MISSING_DECIMALS = 'MISSING_DECIMALS',
  MISSING_PRICE_RATE = 'MISSING_PRICE_RATE',
  MISSING_WEIGHT = 'MISSING_WEIGHT',
}

export class BalancerError extends Error {
  constructor(public code: BalancerErrorCode) {
    super(BalancerError.getMessage(code));
    this.name = 'BalancerError';
  }

  static getMessage(code: BalancerErrorCode): string {
    switch (code) {
      case BalancerErrorCode.SWAP_ZERO_RETURN_AMOUNT:
        return 'queryBatchSwapWithSor returned 0 amount';
      case BalancerErrorCode.UNWRAP_ZERO_AMOUNT:
        return 'swapUnwrapAaveStaticExactIn unwrapped amount < 0';
      case BalancerErrorCode.WRAP_ZERO_AMOUNT:
        return 'swapUnwrapAaveStaticExactOut wrapped amount < 0';
      case BalancerErrorCode.QUERY_BATCH_SWAP:
        return 'queryBatchSwap on chain call error';
      case BalancerErrorCode.POOL_DOESNT_EXIST:
        return 'balancer pool does not exist';
      case BalancerErrorCode.UNSUPPORTED_POOL_TYPE:
        return 'unsupported pool type';
      case BalancerErrorCode.UNSUPPORTED_PAIR:
        return 'unsupported token pair';
      case BalancerErrorCode.NO_POOL_DATA:
        return 'no pool data';
      case BalancerErrorCode.ARRAY_LENGTH_MISMATCH:
        return 'array lengths must match';
      case BalancerErrorCode.INPUT_LENGTH_MISMATCH:
        return 'input length mismatch';
      case BalancerErrorCode.MISSING_AMP:
        return 'missing amp';
      case BalancerErrorCode.MISSING_DECIMALS:
        return 'missing decimals';
      case BalancerErrorCode.MISSING_PRICE_RATE:
        return 'missing price rate';
      case BalancerErrorCode.MISSING_WEIGHT:
        return 'missing weight';
      default:
        return 'Unknown error';
    }
  }
}
