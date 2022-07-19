import { AprFetcher } from '../repository';

let aprTtl = 0;
let apr: number;
let bustCache = false;

/**
 * Controls API response 1h auto-caching, when true (default) it will return APR cached value.
 */
export const cache = (state = true): void => {
  bustCache = !state;
};

interface LidoAPIResponse {
  data: {
    eth: string;
    steth: string;
  };
}

/**
 * Gets Lido APR
 *
 * @returns lido apr in bps
 */
const getApr = async (): Promise<number> => {
  try {
    const response = await fetch('https://stake.lido.fi/api/apr');
    const { data: aprs } = (await response.json()) as LidoAPIResponse;

    return Math.round(parseFloat(aprs.steth) * 100);
  } catch (error) {
    console.error('Failed to fetch stETH APR:', error);
    return 0;
  }
};

/**
 * Business logic around Lido APR fetching
 *
 * @returns cached lido APR for stETH
 */
export const lido: AprFetcher = async () => {
  // cache for 1h
  if (bustCache || Date.now() > aprTtl) {
    apr = await getApr();
    aprTtl = Date.now() + 1 * 60 * 60 * 1000;
  }

  return apr;
};
