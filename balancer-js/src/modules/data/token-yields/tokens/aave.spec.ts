import { expect } from 'chai';
import { aave, cache } from './aave';
import fetchMock from 'fetch-mock';

const wrappedAUsdt = '0xf8fd466f12e236f4c96f7cce6c79eadb819abf58';
const underlyingUsdt = '0xdac17f958d2ee523a2206206994597c13d831ec7';

describe('aave apr', () => {
  before(() => {
    cache(false);
    fetchMock.post('https://api.thegraph.com/subgraphs/name/aave/protocol-v2', {
      data: {
        reserves: [
          {
            underlyingAsset: underlyingUsdt,
            liquidityRate: '16633720952291480781459657',
          },
        ],
      },
    });
  });

  after(() => {
    fetchMock.reset();
    cache(true);
  });

  it('is getting fetched', async () => {
    const apr = await aave(wrappedAUsdt);
    expect(apr).to.eq(166);
  });
});
