import { lido } from './tokens/lido';
import { aave } from './tokens/aave';
import { overnight } from './tokens/overnight';
import { Findable } from '../types';

/**
 * Common interface for fetching APR from external sources
 *
 * @param address is optional, used when same source, eg: aave has multiple tokens and all of them can be fetched in one call.
 */
export interface AprFetcher {
  (address?: string): Promise<number>;
}

export const tokenAprMap: Record<string, AprFetcher> = {
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0': lido,
  '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58': aave,
  '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de': aave,
  '0x02d60b84491589974263d922d9cc7a3152618ef6': aave,
  // Polygon
  '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425': overnight,
  '0x6933ec1ca55c06a894107860c92acdfd2dd8512f': overnight,
};

export class TokenYieldsRepository implements Findable<number> {
  private yields: { [address: string]: number } = {};

  constructor(private tokenMap = tokenAprMap) {}

  async fetch(address: string): Promise<void> {
    const tokenYield = await this.tokenMap[address](address);
    this.yields[address] = tokenYield;
  }

  async find(address: string): Promise<number | undefined> {
    const lowercase = address.toLocaleLowerCase();
    if (
      Object.keys(this.tokenMap).includes(lowercase) &&
      !Object.keys(this.yields).includes(lowercase)
    ) {
      await this.fetch(address);
    }

    return this.yields[lowercase];
  }

  async findBy(attribute: string, value: string): Promise<number | undefined> {
    if (attribute != 'address') {
      return undefined;
    }

    return this.find(value);
  }
}
