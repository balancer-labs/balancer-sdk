import { expect } from 'chai';
import { overnight, cache } from './overnight';
import fetchMock from 'fetch-mock';

describe('overnight apr', () => {
  before(() => {
    cache(false);
    fetchMock.get('https://app.overnight.fi/api/balancer/week/apr', '0.01');
  });
  after(() => {
    fetchMock.reset();
    cache(true);
  });

  it('is getting fetched', async () => {
    const apr = await overnight();
    expect(apr).to.eq(1);
  });
});
