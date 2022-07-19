import { Price, Findable, TokenPrices } from '@/types';
import { wrappedTokensMap as aaveWrappedMap } from '../token-yields/tokens/aave';

/**
 * Simple coingecko price source implementation. Configurable by network and token addresses.
 */
export class CoingeckoPriceRepository implements Findable<Price> {
  prices: TokenPrices = {};
  urlBase: string;
  baseTokenAddresses: string[];

  constructor(tokenAddresses: string[], chainId = 1) {
    this.baseTokenAddresses = tokenAddresses;
    this.urlBase = `https://api.coingecko.com/api/v3/simple/token_price/${this.platform(
      chainId
    )}?vs_currencies=usd,eth`;
  }

  async fetch(address: string): Promise<void> {
    const prices = await (await fetch(this.url(address))).json();
    this.prices = {
      ...this.prices,
      ...prices,
    };
  }

  async find(address: string): Promise<Price | undefined> {
    const unwrapped = unwrapToken(address);
    if (!Object.keys(this.prices).includes(unwrapped)) {
      await this.fetch(unwrapped);
    }

    return this.prices[unwrapped];
  }

  async findBy(attribute: string, value: string): Promise<Price | undefined> {
    if (attribute != 'address') {
      return undefined;
    }

    return this.find(value);
  }

  private platform(chainId: number): string {
    switch (chainId) {
      case 1:
      case 42:
      case 31337:
        return 'ethereum';
      case 137:
        return 'polygon-pos';
      case 42161:
        return 'arbitrum-one';
    }

    return '2';
  }

  private url(address: string): string {
    if (this.baseTokenAddresses.includes(address)) {
      return `${this.urlBase}&contract_addresses=${this.baseTokenAddresses.join(
        ','
      )}`;
    } else {
      return `${this.urlBase}&contract_addresses=${address}`;
    }
  }
}

const unwrapToken = (wrappedAddress: string) => {
  const lowercase = wrappedAddress.toLocaleLowerCase();

  if (Object.keys(aaveWrappedMap).includes(lowercase)) {
    return aaveWrappedMap[lowercase as keyof typeof aaveWrappedMap].aToken;
  } else {
    return lowercase;
  }
};
