import type { Findable, Token } from '@/types';
import type { TokenAttribute } from './types';

export class StaticTokenProvider implements Findable<Token, TokenAttribute> {
  constructor(private tokens: Token[]) {}

  async find(address: string): Promise<Token | undefined> {
    return this.tokens.find((token) => {
      return token.address.toLowerCase() === address.toLowerCase();
    });
  }

  async findBy(
    attribute: TokenAttribute,
    value: string
  ): Promise<Token | undefined> {
    return this.tokens.find((token) => {
      return token[attribute] === value;
    });
  }
}
