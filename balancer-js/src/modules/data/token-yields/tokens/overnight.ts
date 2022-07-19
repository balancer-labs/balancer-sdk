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

/**
 * Gets Lido APR
 *
 * @returns lido apr in bps
 */
const getApr = async (): Promise<number> => {
  try {
    const response = await fetch(
      'https://app.overnight.fi/api/balancer/week/apr'
    );
    const apr = await response.text();

    return Math.round((parseFloat(apr) * 10000) / 100);
  } catch (error) {
    console.error('Failed to fetch USD+ APR:', error);
    return 0;
  }
};

/**
 * Business logic around APR fetching
 *
 * @returns cached APR for USD+
 */
export const overnight: AprFetcher = async () => {
  // cache for 1h
  if (bustCache || Date.now() > aprTtl) {
    apr = await getApr();
    aprTtl = Date.now() + 1 * 60 * 60 * 1000;
  }

  return apr;
};
