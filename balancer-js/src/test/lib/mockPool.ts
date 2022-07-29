import { PoolDataService } from '@balancer-labs/sor';
import { SubgraphPoolBase, BalancerError, BalancerErrorCode } from '@/.';

export class MockPoolDataService implements PoolDataService {
  constructor(private pools: SubgraphPoolBase[] = []) {}

  public async getPools(): Promise<SubgraphPoolBase[]> {
    return this.pools;
  }

  public setPools(pools: SubgraphPoolBase[]): void {
    this.pools = pools;
  }

  public getPool(poolId: string): SubgraphPoolBase {
    const pool = this.pools.find((pool) => pool.id == poolId);
    if (!pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
    return pool;
  }
}

export const mockPool: SubgraphPoolBase = {
  address: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56',
  id: '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014',
  poolType: 'Weighted',
  swapEnabled: true,
  swapFee: '0.0005',
  tokens: [
    {
      address: '0xba100000625a3754423978a60c9317c58a424e3d',
      balance: '5489603.901499267423530886',
      decimals: 18,
      priceRate: '1',
      weight: '0.8',
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      balance: '6627.784151437690672979',
      decimals: 18,
      priceRate: '1',
      weight: '0.2',
    },
  ],
  tokensList: [
    '0xba100000625a3754423978a60c9317c58a424e3d',
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  ],
  totalShares: '2848354.78492663257738526',
  totalWeight: '1',
};

export const mockPoolDataService = new MockPoolDataService([mockPool]);
