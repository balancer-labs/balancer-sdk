import { Price } from '@/types';

export interface TokenPriceProvider {
  find: (address: string) => Promise<Price | undefined>;
}
