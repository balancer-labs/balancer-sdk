import { GaugeControllerMulticallRepository } from '../gauge-controller/multicall';
import { LiquidityGaugesMulticallRepository, RewardData } from './multicall';
import { LiquidityGaugesSubgraphRepository } from './subgraph';
import type {
  Maybe,
  SubgraphLiquidityGauge,
} from '@/modules/subgraph/subgraph';
import type { Findable } from '../types';
import type { Provider } from '@ethersproject/providers';

export interface LiquidityGauge {
  id: string;
  address: string;
  name: string;
  poolId?: Maybe<string>;
  poolAddress: string;
  totalSupply: number;
  workingSupply: number;
  relativeWeight: number;
  rewardTokens?: { [tokenAddress: string]: RewardData };
}

export class LiquidityGaugeSubgraphRPCProvider
  implements Findable<LiquidityGauge>
{
  gaugeController: GaugeControllerMulticallRepository;
  multicall: LiquidityGaugesMulticallRepository;
  subgraph: LiquidityGaugesSubgraphRepository;
  totalSupplies: { [gaugeAddress: string]: number } = {};
  workingSupplies: { [gaugeAddress: string]: number } = {};
  relativeWeights: { [gaugeAddress: string]: number } = {};
  rewardTokens: {
    [gaugeAddress: string]: { [tokenAddress: string]: RewardData };
  } = {};

  constructor(
    subgraphUrl: string,
    multicallAddress: string,
    gaugeControllerAddress: string,
    provider: Provider
  ) {
    this.gaugeController = new GaugeControllerMulticallRepository(
      multicallAddress,
      gaugeControllerAddress,
      provider
    );
    this.multicall = new LiquidityGaugesMulticallRepository(
      multicallAddress,
      provider
    );
    this.subgraph = new LiquidityGaugesSubgraphRepository(subgraphUrl);
  }

  async fetch(): Promise<void> {
    const gauges = await this.subgraph.fetch();
    const gaugeAddresses = gauges.map((g) => g.id);
    this.totalSupplies = await this.multicall.getTotalSupplies(gaugeAddresses);
    this.workingSupplies = await this.multicall.getWorkingSupplies(
      gaugeAddresses
    );
    this.rewardTokens = await this.multicall.getRewardData(gaugeAddresses);
    this.relativeWeights = await this.gaugeController.getRelativeWeights(
      gaugeAddresses
    );
  }

  async find(id: string): Promise<LiquidityGauge | undefined> {
    if (Object.keys(this.relativeWeights).length == 0) {
      await this.fetch();
    }

    const gauge = await this.subgraph.find(id);
    if (!gauge) {
      return;
    }

    return this.compose(gauge);
  }

  async findBy(
    attribute: string,
    value: string
  ): Promise<LiquidityGauge | undefined> {
    if (Object.keys(this.relativeWeights).length == 0) {
      await this.fetch();
    }

    let gauge: SubgraphLiquidityGauge | undefined;
    if (attribute == 'id') {
      return this.find(value);
    } else if (attribute == 'address') {
      return this.find(value);
    } else if (attribute == 'poolId') {
      gauge = await this.subgraph.findBy('poolId', value);
    } else if (attribute == 'poolAddress') {
      gauge = await this.subgraph.findBy('poolAddress', value);
    } else {
      throw `search by ${attribute} not implemented`;
    }
    if (!gauge) {
      return undefined;
    }

    return this.compose(gauge);
  }

  private compose(subgraphGauge: SubgraphLiquidityGauge) {
    return {
      id: subgraphGauge.id,
      address: subgraphGauge.id,
      name: subgraphGauge.symbol,
      poolId: subgraphGauge.poolId,
      poolAddress: subgraphGauge.poolAddress,
      totalSupply: this.totalSupplies[subgraphGauge.id],
      workingSupply: this.workingSupplies[subgraphGauge.id],
      relativeWeight: this.relativeWeights[subgraphGauge.id],
      rewardTokens: this.rewardTokens[subgraphGauge.id],
    };
  }
}
