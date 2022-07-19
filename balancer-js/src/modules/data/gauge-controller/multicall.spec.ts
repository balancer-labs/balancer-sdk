import { JsonRpcProvider } from '@ethersproject/providers';
import { expect } from 'chai';
import { GaugeControllerMulticallRepository } from './multicall';

describe('Gauge controller', () => {
  const provider = new JsonRpcProvider('http://127.0.0.1:8545', 1);
  const fetcher = new GaugeControllerMulticallRepository(
    '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    '0xc128468b7ce63ea702c1f104d55a2566b13d3abd',
    provider
  );

  it('is fetching relative weights for current period', async () => {
    const weights = await fetcher.getRelativeWeights([
      '0x9f65d476dd77e24445a48b4fecdea81afaa63480',
      '0xcb664132622f29943f67fa56ccfd1e24cc8b4995',
      '0xaf50825b010ae4839ac444f6c12d44b96819739b',
    ]);

    expect(Object.keys(weights).length).to.eq(3);
    expect(weights['0x9f65d476dd77e24445a48b4fecdea81afaa63480']).to.satisfy(
      (n: number) => n >= 0
    );
  }).timeout(20000);

  it('is fetching relative weights for next period', async () => {
    const weights = await fetcher.getRelativeWeights(
      [
        '0x9f65d476dd77e24445a48b4fecdea81afaa63480',
        '0xcb664132622f29943f67fa56ccfd1e24cc8b4995',
        '0xaf50825b010ae4839ac444f6c12d44b96819739b',
      ],
      Math.floor(Date.now() / 1000) + 7 * 24 * 3600
    );

    expect(Object.keys(weights).length).to.eq(3);
    expect(weights['0x9f65d476dd77e24445a48b4fecdea81afaa63480']).to.satisfy(
      (n: number) => n >= 0
    );
  }).timeout(20000);
});
