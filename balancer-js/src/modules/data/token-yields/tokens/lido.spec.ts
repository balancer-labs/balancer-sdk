import { expect } from 'chai';
import { lido, cache } from './lido';
import fetchMock from 'fetch-mock';

describe('lido apr', () => {
  before(() => {
    cache(false);
    fetchMock.get('https://stake.lido.fi/api/apr', {
      data: { eth: '1', steth: '1' },
    });
  });
  after(() => {
    fetchMock.reset();
    cache(true);
  });

  it('is getting fetched', async () => {
    const apr = await lido();
    expect(apr).to.eq(100);
  });
});
