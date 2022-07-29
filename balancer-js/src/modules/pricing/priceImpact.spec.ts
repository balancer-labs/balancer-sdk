import dotenv from 'dotenv';
import { expect } from 'chai';
import { calcPriceImpact } from './priceImpact';

dotenv.config();

describe('priceImpact', () => {
  it('zero price impact', async () => {
    const priceImpact = calcPriceImpact(BigInt(1e18), BigInt(1e18));
    expect(priceImpact.toString()).to.eq('0');
  });

  it('50% price impact', async () => {
    const priceImpact = calcPriceImpact(BigInt(1e18), BigInt(2e18));
    expect(priceImpact.toString()).to.eq('500000000000000000');
  });

  // TO DO - How do we handle positive price impact?
});
