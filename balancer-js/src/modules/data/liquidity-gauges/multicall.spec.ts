import { JsonRpcProvider } from '@ethersproject/providers';
import { expect } from 'chai';
import { LiquidityGaugesMulticallRepository } from './multicall';
import { LiquidityGaugesSubgraphRepository } from './subgraph';

describe('Liquidity gauge multicall', () => {
  const provider = new JsonRpcProvider('http://127.0.0.1:8545', 1);
  const fetcher = new LiquidityGaugesMulticallRepository(
    '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    provider
  );

  it('is fetching total supplies', async () => {
    const supplies = await fetcher.getTotalSupplies([
      '0x9f65d476dd77e24445a48b4fecdea81afaa63480',
      '0xcb664132622f29943f67fa56ccfd1e24cc8b4995',
      '0xaf50825b010ae4839ac444f6c12d44b96819739b',
    ]);

    expect(Object.keys(supplies).length).to.eq(3);
    expect(supplies['0x9f65d476dd77e24445a48b4fecdea81afaa63480']).to.satisfy(
      (n: number) => n >= 0
    );
  }).timeout(20000);

  it('is fetching working supplies', async () => {
    const supplies = await fetcher.getWorkingSupplies([
      '0x9f65d476dd77e24445a48b4fecdea81afaa63480',
      '0xcb664132622f29943f67fa56ccfd1e24cc8b4995',
      '0xaf50825b010ae4839ac444f6c12d44b96819739b',
    ]);

    expect(Object.keys(supplies).length).to.eq(3);
    expect(supplies['0x9f65d476dd77e24445a48b4fecdea81afaa63480']).to.satisfy(
      (n: number) => n >= 0
    );
  }).timeout(20000);

  describe('with all gauges from subgraph', () => {
    const gauges = new LiquidityGaugesSubgraphRepository(
      'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges'
    );

    it('is fetching reward counts', async () => {
      const list = await gauges.fetch();
      const gaugeAddresses = list.map((g) => g.id);
      const rewardCounts = await fetcher.getRewardCounts(gaugeAddresses);

      expect(rewardCounts[Object.keys(rewardCounts)[0]]).to.be.gte(0);
    }).timeout(20000);

    it('is fetching reward data', async () => {
      const list = await gauges.fetch();
      const gaugeAddresses = list.map((g) => g.id);
      const rewardData = await fetcher.getRewardData(gaugeAddresses);
      const firstToken = rewardData[Object.keys(rewardData)[0]];

      expect(firstToken[Object.keys(firstToken)[0]].token).to.eq(
        '0x0000000000000000000000000000000000000000'
      );
    }).timeout(20000);
  });
});
