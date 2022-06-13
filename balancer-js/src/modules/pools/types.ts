import { BigNumber } from "@ethersproject/bignumber";

export enum PoolType {
  Weighted = 'Weighted',
  Investment = 'Investment',
  Stable = 'Stable',
  MetaStable = 'MetaStable',
  StablePhantom = 'StablePhantom',
  LiquidityBootstrapping = 'LiquidityBootstrapping',
}

export type SeedToken = {
  tokenAddress: string;
  weight: number;
  isLocked: boolean;
  amount: string;
  id: number;
}

export type PoolInfo = {
  id: number;
  name: string;
  address: string;
}

export type WeightedFactoryParams = { 
  name: string;
  symbol: string;
  initialFee: string;
  seedTokens: SeedToken[];
  owner: string; value: string;
}

export type WeightedFactoryAttributes = {
  to: any;
  data: any
  value?: BigNumber;
  functionName: string;
  attributes: {
    name: string;
    symbol: string;
    swapFee: string;
    tokens: SeedToken[];
    owner: string;
  },
  err?: boolean
}

export interface InitJoinAttributes {
  to: string;
  functionName: string;
  attributes: any
  data: string;
  value?: BigNumber;
  err?: boolean;
}
