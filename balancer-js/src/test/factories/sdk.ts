import { Pool, PoolType, PoolToken } from '../../types';
import { Factory } from 'fishery';
import { namedTokens } from './named-tokens';

const poolTokenFactory = Factory.define<PoolToken>(({ transientParams }) => {
  const { symbol } = transientParams;
  const namedToken = namedTokens[symbol];

  return {
    ...namedToken,
    balance: '1',
    priceRate: '1',
    weight: '0.5',
  };
});

const poolFactory = Factory.define<Pool>(({ params, afterBuild }) => {
  afterBuild((pool) => {
    pool.tokensList = pool.tokens.map((t) => t.address);
  });

  const tokens = params.tokens || [
    poolTokenFactory.transient({ symbol: 'wETH' }).build(),
    poolTokenFactory.transient({ symbol: 'wBTC' }).build(),
  ];

  return {
    id: '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e',
    address: '0xa6f548df93de924d73be7d25dc02554c6bd66db5',
    poolType: PoolType.Weighted,
    swapFee: '0.001',
    swapEnabled: true,
    tokens,
    tokensList: [],
    totalWeight: '1',
    totalShares: '1',
  };
});

export { poolFactory, poolTokenFactory };
