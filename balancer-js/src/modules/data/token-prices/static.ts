import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { parseFixed } from '@/lib/utils/math';
import { Price, TokenPrices } from '@/types';
import { TokenPriceProvider } from './types';

const SCALING_FACTOR = 18;

export class StaticTokenPriceProvider implements TokenPriceProvider {
  constructor(private tokenPrices: TokenPrices) {
    this.calculateUSDPrices();
  }

  /**
   * Iterates through all tokens and calculates USD prices
   * based on data the tokens already have.
   */
  calculateUSDPrices(): void {
    const USDAssets = [
      '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
      '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    ];
    let assetsAvailable = 0;
    let assetValueSum = BigNumber.from(0);

    USDAssets.forEach((address) => {
      const tokenPrice = this.tokenPrices[address];
      if (tokenPrice?.eth) {
        const scaledPrice = parseFixed(tokenPrice?.eth, SCALING_FACTOR);
        assetValueSum = assetValueSum.add(scaledPrice);
        assetsAvailable++;
      }
    });

    if (assetsAvailable === 0) return;
    const NativeAssetUSDPrice = assetValueSum.div(assetsAvailable);

    for (const token in this.tokenPrices) {
      const price = this.tokenPrices[token];
      if (price.eth && !price.usd) {
        const usdPrice = parseFixed('1', SCALING_FACTOR)
          .mul(parseFixed(price.eth, SCALING_FACTOR))
          .div(NativeAssetUSDPrice)
          .toString();
        price.usd = formatFixed(usdPrice, SCALING_FACTOR);
      }
    }
  }

  async find(address: string): Promise<Price | undefined> {
    const price = this.tokenPrices[address];
    if (!price) return;
    return price;
  }
}
