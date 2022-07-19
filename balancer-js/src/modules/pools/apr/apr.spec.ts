import { BigNumber } from '@ethersproject/bignumber';
import { expect } from 'chai';
import MockDate from 'mockdate';
import { PoolApr } from './apr';
import { factories } from '@/test/factories';
import * as emissions from '@/modules/data/bal/emissions';
import type { LiquidityGauge, Pool } from '@/types';

const wETH = factories.poolTokenFactory
  .transient({ symbol: 'wETH' })
  .build({ weight: '0.5' });
const wstETH = factories.poolTokenFactory
  .transient({ symbol: 'wstETH' })
  .build({ weight: '0.5' });
const tokens = [wstETH, wETH];

const now = new Date();
const yearAgo = new Date(new Date(now).setFullYear(now.getFullYear() - 1));

const poolData = factories.poolFactory.build({
  createTime: Math.round(+yearAgo / 1000),
  address: 'pool',
  totalSwapFee: '100',
  totalLiquidity: '100',
  totalShares: '100',
  tokens,
});

const poolsMap = new Map([[poolData.address, poolData]]);
const poolRepository = factories.data.findable<Pool>(poolsMap);
const repositories = factories.data.repositores({ pools: poolRepository });

// TODO: move to factory
const baseGauge = {
  id: 'gauge',
  name: 'gauge',
  address: 'address',
  poolAddress: '1',
  totalSupply: 1,
  workingSupply: 1,
  relativeWeight: 1,
};

// TODO: move to factory
const baseRewardToken = {
  token: '0x0',
  distributor: '0x0',
  period_finish: BigNumber.from(Math.round(+now / 1000 + 7 * 86400)),
  rate: BigNumber.from('31709792000'), // 1 / 365 / 86400 scaled to 1e18
  integral: BigNumber.from('0'),
  last_update: BigNumber.from('0'),
};

describe('pool apr', () => {
  before(() => {
    MockDate.set(now);
  });

  after(() => {
    MockDate.reset();
  });

  describe('.swapFees', () => {
    // Notice that create time is set to 1 year ago.
    // With totalLiquidity and totalSwapFees = 100, it's 100% apr
    it('are 10000 bsp APR', async () => {
      const apr = await new PoolApr(
        poolData,
        repositories.tokenPrices,
        repositories.tokenMeta,
        repositories.pools,
        repositories.liquidityGauges,
        repositories.feeDistributor,
        repositories.feeCollector,
        repositories.tokenYields
      ).swapFees();
      expect(apr).to.eq(10000);
    });
  });

  describe('.tokenAprs', () => {
    describe('lido token', () => {
      // It will equal 1%, because rate is 2% but weight is 50%
      it('are 100 bsp (1%)', async () => {
        const apr = await new PoolApr(
          poolData,
          repositories.tokenPrices,
          repositories.tokenMeta,
          repositories.pools,
          repositories.liquidityGauges,
          repositories.feeDistributor,
          repositories.feeCollector,
          repositories.tokenYields
        ).tokenAprs();
        expect(apr).to.eq(100);
      });
    });

    describe('nested pools', () => {
      // Setting up pool with 100% total APR
      const pool = factories.poolFactory.build({
        createTime: Math.floor(+yearAgo / 1000),
        address: 'pool1',
        totalSwapFee: '100',
        totalLiquidity: '100',
        tokens: [],
      });
      // Notice weight of the bptToken.
      // It is defining share in tokenAprs
      const bptToken = factories.poolTokenFactory.build({
        address: 'pool1',
        decimals: 18,
        balance: '1',
        weight: '0.5',
      });
      const poolWithBpt = factories.poolFactory.build({
        address: 'poolWithBpt',
        tokens: [wETH, bptToken],
        totalSwapFee: '1',
        totalLiquidity: '100',
      });
      poolsMap.set(pool.address, pool);
      poolsMap.set(poolWithBpt.address, poolWithBpt);

      it('are 5000 bsp (50%) half of pool1 APR', async () => {
        const apr = await new PoolApr(
          poolWithBpt,
          repositories.tokenPrices,
          repositories.tokenMeta,
          repositories.pools,
          repositories.liquidityGauges,
          repositories.feeDistributor,
          factories.data.stubbed<number>(0),
          factories.data.stubbed<number>(undefined)
        ).tokenAprs();

        expect(apr).to.eq(10000 / 2);
      });
    });
  });

  describe('.stakingApr', () => {
    // Notice one token in gauge is worth 40% of it's value
    it('has bal rewards as ~40% apr', async () => {
      const now = Math.round(Date.now() / 1000);
      const balEmissions = emissions.between(now, now + 365 * 86400);

      const gauge = {
        ...baseGauge,
        workingSupply: balEmissions,
      };

      const apr = await new PoolApr(
        poolData,
        repositories.tokenPrices,
        repositories.tokenMeta,
        repositories.pools,
        factories.data.stubbed<LiquidityGauge>(gauge),
        repositories.feeDistributor,
        repositories.feeCollector,
        factories.data.stubbed<number>(undefined)
      ).stakingApr();

      expect(apr).to.eq(4000);
    });
  });

  describe('.rewardsAprs', () => {
    it('has token rewards', async () => {
      const rewardTokens = {
        address1: baseRewardToken,
        address2: baseRewardToken,
      };
      const gauge = {
        ...baseGauge,
        rewardTokens,
      };

      const apr = await new PoolApr(
        poolData,
        repositories.tokenPrices,
        repositories.tokenMeta,
        repositories.pools,
        factories.data.stubbed<LiquidityGauge>(gauge),
        repositories.feeDistributor,
        repositories.feeCollector,
        factories.data.stubbed<number>(undefined)
      ).rewardsApr();

      expect(apr).to.eq(20000);
    });
  });
});
