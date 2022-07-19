import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: string;
};

export type AmpUpdate = {
  __typename?: 'AmpUpdate';
  endAmp: Scalars['BigInt'];
  endTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  scheduledTimestamp: Scalars['Int'];
  startAmp: Scalars['BigInt'];
  startTimestamp: Scalars['BigInt'];
};

export type AmpUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  endAmp?: InputMaybe<Scalars['BigInt']>;
  endAmp_gt?: InputMaybe<Scalars['BigInt']>;
  endAmp_gte?: InputMaybe<Scalars['BigInt']>;
  endAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp_lt?: InputMaybe<Scalars['BigInt']>;
  endAmp_lte?: InputMaybe<Scalars['BigInt']>;
  endAmp_not?: InputMaybe<Scalars['BigInt']>;
  endAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startAmp?: InputMaybe<Scalars['BigInt']>;
  startAmp_gt?: InputMaybe<Scalars['BigInt']>;
  startAmp_gte?: InputMaybe<Scalars['BigInt']>;
  startAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startAmp_lt?: InputMaybe<Scalars['BigInt']>;
  startAmp_lte?: InputMaybe<Scalars['BigInt']>;
  startAmp_not?: InputMaybe<Scalars['BigInt']>;
  startAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AmpUpdate_OrderBy {
  EndAmp = 'endAmp',
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  PoolId = 'poolId',
  ScheduledTimestamp = 'scheduledTimestamp',
  StartAmp = 'startAmp',
  StartTimestamp = 'startTimestamp'
}

export type Balancer = {
  __typename?: 'Balancer';
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  pools?: Maybe<Array<Pool>>;
  totalLiquidity: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};


export type BalancerPoolsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pool_Filter>;
};

export type BalancerSnapshot = {
  __typename?: 'BalancerSnapshot';
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  timestamp: Scalars['Int'];
  totalLiquidity: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
  vault: Balancer;
};

export type BalancerSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_?: InputMaybe<Balancer_Filter>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum BalancerSnapshot_OrderBy {
  Id = 'id',
  PoolCount = 'poolCount',
  Timestamp = 'timestamp',
  TotalLiquidity = 'totalLiquidity',
  TotalSwapCount = 'totalSwapCount',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
  Vault = 'vault'
}

export type Balancer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolCount?: InputMaybe<Scalars['Int']>;
  poolCount_gt?: InputMaybe<Scalars['Int']>;
  poolCount_gte?: InputMaybe<Scalars['Int']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
  poolCount_lt?: InputMaybe<Scalars['Int']>;
  poolCount_lte?: InputMaybe<Scalars['Int']>;
  poolCount_not?: InputMaybe<Scalars['Int']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pools_?: InputMaybe<Pool_Filter>;
  totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Balancer_OrderBy {
  Id = 'id',
  PoolCount = 'poolCount',
  Pools = 'pools',
  TotalLiquidity = 'totalLiquidity',
  TotalSwapCount = 'totalSwapCount',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type GradualWeightUpdate = {
  __typename?: 'GradualWeightUpdate';
  endTimestamp: Scalars['BigInt'];
  endWeights: Array<Scalars['BigInt']>;
  id: Scalars['ID'];
  poolId: Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['BigInt'];
  startWeights: Array<Scalars['BigInt']>;
};

export type GradualWeightUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  endTimestamp?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scheduledTimestamp?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum GradualWeightUpdate_OrderBy {
  EndTimestamp = 'endTimestamp',
  EndWeights = 'endWeights',
  Id = 'id',
  PoolId = 'poolId',
  ScheduledTimestamp = 'scheduledTimestamp',
  StartTimestamp = 'startTimestamp',
  StartWeights = 'startWeights'
}

export enum InvestType {
  Exit = 'Exit',
  Join = 'Join'
}

export type JoinExit = {
  __typename?: 'JoinExit';
  amounts: Array<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  pool: Pool;
  sender: Scalars['Bytes'];
  timestamp: Scalars['Int'];
  tx: Scalars['Bytes'];
  type: InvestType;
  user: User;
};

export type JoinExit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender?: InputMaybe<Scalars['Bytes']>;
  sender_contains?: InputMaybe<Scalars['Bytes']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  sender_not?: InputMaybe<Scalars['Bytes']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tx?: InputMaybe<Scalars['Bytes']>;
  tx_contains?: InputMaybe<Scalars['Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_not?: InputMaybe<Scalars['Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['Bytes']>;
  tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  type?: InputMaybe<InvestType>;
  type_in?: InputMaybe<Array<InvestType>>;
  type_not?: InputMaybe<InvestType>;
  type_not_in?: InputMaybe<Array<InvestType>>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum JoinExit_OrderBy {
  Amounts = 'amounts',
  Id = 'id',
  Pool = 'pool',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Tx = 'tx',
  Type = 'type',
  User = 'user'
}

export type LatestPrice = {
  __typename?: 'LatestPrice';
  asset: Scalars['Bytes'];
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  price: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
};

export type LatestPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum LatestPrice_OrderBy {
  Asset = 'asset',
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  Price = 'price',
  PricingAsset = 'pricingAsset'
}

export type ManagementOperation = {
  __typename?: 'ManagementOperation';
  cashDelta: Scalars['BigDecimal'];
  id: Scalars['ID'];
  managedDelta: Scalars['BigDecimal'];
  poolTokenId: PoolToken;
  timestamp: Scalars['Int'];
  type: OperationType;
};

export type ManagementOperation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  cashDelta?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_gt?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_gte?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashDelta_lt?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_lte?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_not?: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  managedDelta?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_gt?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_gte?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  managedDelta_lt?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_lte?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_not?: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolTokenId?: InputMaybe<Scalars['String']>;
  poolTokenId_?: InputMaybe<PoolToken_Filter>;
  poolTokenId_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with?: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolTokenId_gt?: InputMaybe<Scalars['String']>;
  poolTokenId_gte?: InputMaybe<Scalars['String']>;
  poolTokenId_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_lt?: InputMaybe<Scalars['String']>;
  poolTokenId_lte?: InputMaybe<Scalars['String']>;
  poolTokenId_not?: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains?: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolTokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with?: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  type?: InputMaybe<OperationType>;
  type_in?: InputMaybe<Array<OperationType>>;
  type_not?: InputMaybe<OperationType>;
  type_not_in?: InputMaybe<Array<OperationType>>;
};

export enum ManagementOperation_OrderBy {
  CashDelta = 'cashDelta',
  Id = 'id',
  ManagedDelta = 'managedDelta',
  PoolTokenId = 'poolTokenId',
  Timestamp = 'timestamp',
  Type = 'type'
}

export enum OperationType {
  Deposit = 'Deposit',
  Update = 'Update',
  Withdraw = 'Withdraw'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pool = {
  __typename?: 'Pool';
  address: Scalars['Bytes'];
  amp?: Maybe<Scalars['BigInt']>;
  baseToken?: Maybe<Scalars['Bytes']>;
  createTime: Scalars['Int'];
  expiryTime?: Maybe<Scalars['BigInt']>;
  factory?: Maybe<Scalars['Bytes']>;
  historicalValues?: Maybe<Array<PoolHistoricalLiquidity>>;
  holdersCount: Scalars['BigInt'];
  id: Scalars['ID'];
  lowerTarget?: Maybe<Scalars['BigDecimal']>;
  mainIndex?: Maybe<Scalars['Int']>;
  managementFee?: Maybe<Scalars['BigDecimal']>;
  name?: Maybe<Scalars['String']>;
  oracleEnabled: Scalars['Boolean'];
  owner?: Maybe<Scalars['Bytes']>;
  poolType?: Maybe<Scalars['String']>;
  priceRateProviders?: Maybe<Array<PriceRateProvider>>;
  principalToken?: Maybe<Scalars['Bytes']>;
  root3Alpha?: Maybe<Scalars['BigDecimal']>;
  shares?: Maybe<Array<PoolShare>>;
  snapshots?: Maybe<Array<PoolSnapshot>>;
  sqrtAlpha?: Maybe<Scalars['BigDecimal']>;
  sqrtBeta?: Maybe<Scalars['BigDecimal']>;
  strategyType: Scalars['Int'];
  swapEnabled: Scalars['Boolean'];
  swapFee: Scalars['BigDecimal'];
  swaps?: Maybe<Array<Swap>>;
  swapsCount: Scalars['BigInt'];
  symbol?: Maybe<Scalars['String']>;
  tokens?: Maybe<Array<PoolToken>>;
  tokensList: Array<Scalars['Bytes']>;
  totalLiquidity: Scalars['BigDecimal'];
  totalShares: Scalars['BigDecimal'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
  totalWeight?: Maybe<Scalars['BigDecimal']>;
  tx?: Maybe<Scalars['Bytes']>;
  unitSeconds?: Maybe<Scalars['BigInt']>;
  upperTarget?: Maybe<Scalars['BigDecimal']>;
  vaultID: Balancer;
  weightUpdates?: Maybe<Array<GradualWeightUpdate>>;
  wrappedIndex?: Maybe<Scalars['Int']>;
};


export type PoolHistoricalValuesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
};


export type PoolPriceRateProvidersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PriceRateProvider_Filter>;
};


export type PoolSharesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolShare_Filter>;
};


export type PoolSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolSnapshot_Filter>;
};


export type PoolSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};


export type PoolTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolToken_Filter>;
};


export type PoolWeightUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
};

export type PoolHistoricalLiquidity = {
  __typename?: 'PoolHistoricalLiquidity';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  poolLiquidity: Scalars['BigDecimal'];
  poolShareValue: Scalars['BigDecimal'];
  poolTotalShares: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
};

export type PoolHistoricalLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolShareValue?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_gt?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_gte?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolShareValue_lt?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_lte?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_not?: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolTotalShares?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolTotalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_not?: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum PoolHistoricalLiquidity_OrderBy {
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  PoolLiquidity = 'poolLiquidity',
  PoolShareValue = 'poolShareValue',
  PoolTotalShares = 'poolTotalShares',
  PricingAsset = 'pricingAsset'
}

export type PoolShare = {
  __typename?: 'PoolShare';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  poolId: Pool;
  userAddress: User;
};

export type PoolShare_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum PoolShare_OrderBy {
  Balance = 'balance',
  Id = 'id',
  PoolId = 'poolId',
  UserAddress = 'userAddress'
}

export type PoolSnapshot = {
  __typename?: 'PoolSnapshot';
  amounts: Array<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  pool: Pool;
  swapFees: Scalars['BigDecimal'];
  swapVolume: Scalars['BigDecimal'];
  timestamp: Scalars['Int'];
  totalShares: Scalars['BigDecimal'];
};

export type PoolSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amounts?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  liquidity?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swapFees?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_not?: InputMaybe<Scalars['BigDecimal']>;
  swapFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapVolume?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalShares?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PoolSnapshot_OrderBy {
  Amounts = 'amounts',
  Id = 'id',
  Liquidity = 'liquidity',
  Pool = 'pool',
  SwapFees = 'swapFees',
  SwapVolume = 'swapVolume',
  Timestamp = 'timestamp',
  TotalShares = 'totalShares'
}

export type PoolToken = {
  __typename?: 'PoolToken';
  address: Scalars['String'];
  assetManager: Scalars['Bytes'];
  balance: Scalars['BigDecimal'];
  cashBalance: Scalars['BigDecimal'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  managedBalance: Scalars['BigDecimal'];
  managements?: Maybe<Array<ManagementOperation>>;
  name: Scalars['String'];
  poolId?: Maybe<Pool>;
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  token: Token;
  weight?: Maybe<Scalars['BigDecimal']>;
};


export type PoolTokenManagementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ManagementOperation_Filter>;
};

export type PoolToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  assetManager?: InputMaybe<Scalars['Bytes']>;
  assetManager_contains?: InputMaybe<Scalars['Bytes']>;
  assetManager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  assetManager_not?: InputMaybe<Scalars['Bytes']>;
  assetManager_not_contains?: InputMaybe<Scalars['Bytes']>;
  assetManager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashBalance?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  managedBalance?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  managedBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  managements_?: InputMaybe<ManagementOperation_Filter>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  priceRate?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_not?: InputMaybe<Scalars['BigDecimal']>;
  priceRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt?: InputMaybe<Scalars['BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PoolToken_OrderBy {
  Address = 'address',
  AssetManager = 'assetManager',
  Balance = 'balance',
  CashBalance = 'cashBalance',
  Decimals = 'decimals',
  Id = 'id',
  ManagedBalance = 'managedBalance',
  Managements = 'managements',
  Name = 'name',
  PoolId = 'poolId',
  PriceRate = 'priceRate',
  Symbol = 'symbol',
  Token = 'token',
  Weight = 'weight'
}

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amp?: InputMaybe<Scalars['BigInt']>;
  amp_gt?: InputMaybe<Scalars['BigInt']>;
  amp_gte?: InputMaybe<Scalars['BigInt']>;
  amp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amp_lt?: InputMaybe<Scalars['BigInt']>;
  amp_lte?: InputMaybe<Scalars['BigInt']>;
  amp_not?: InputMaybe<Scalars['BigInt']>;
  amp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseToken?: InputMaybe<Scalars['Bytes']>;
  baseToken_contains?: InputMaybe<Scalars['Bytes']>;
  baseToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  baseToken_not?: InputMaybe<Scalars['Bytes']>;
  baseToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  baseToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createTime?: InputMaybe<Scalars['Int']>;
  createTime_gt?: InputMaybe<Scalars['Int']>;
  createTime_gte?: InputMaybe<Scalars['Int']>;
  createTime_in?: InputMaybe<Array<Scalars['Int']>>;
  createTime_lt?: InputMaybe<Scalars['Int']>;
  createTime_lte?: InputMaybe<Scalars['Int']>;
  createTime_not?: InputMaybe<Scalars['Int']>;
  createTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
  expiryTime?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_gte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTime_lt?: InputMaybe<Scalars['BigInt']>;
  expiryTime_lte?: InputMaybe<Scalars['BigInt']>;
  expiryTime_not?: InputMaybe<Scalars['BigInt']>;
  expiryTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  factory?: InputMaybe<Scalars['Bytes']>;
  factory_contains?: InputMaybe<Scalars['Bytes']>;
  factory_in?: InputMaybe<Array<Scalars['Bytes']>>;
  factory_not?: InputMaybe<Scalars['Bytes']>;
  factory_not_contains?: InputMaybe<Scalars['Bytes']>;
  factory_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  historicalValues_?: InputMaybe<PoolHistoricalLiquidity_Filter>;
  holdersCount?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not?: InputMaybe<Scalars['BigInt']>;
  holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lowerTarget?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_gt?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_gte?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lowerTarget_lt?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_lte?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_not?: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  mainIndex?: InputMaybe<Scalars['Int']>;
  mainIndex_gt?: InputMaybe<Scalars['Int']>;
  mainIndex_gte?: InputMaybe<Scalars['Int']>;
  mainIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  mainIndex_lt?: InputMaybe<Scalars['Int']>;
  mainIndex_lte?: InputMaybe<Scalars['Int']>;
  mainIndex_not?: InputMaybe<Scalars['Int']>;
  mainIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
  managementFee?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  managementFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_not?: InputMaybe<Scalars['BigDecimal']>;
  managementFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  oracleEnabled?: InputMaybe<Scalars['Boolean']>;
  oracleEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  oracleEnabled_not?: InputMaybe<Scalars['Boolean']>;
  oracleEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  poolType?: InputMaybe<Scalars['String']>;
  poolType_contains?: InputMaybe<Scalars['String']>;
  poolType_contains_nocase?: InputMaybe<Scalars['String']>;
  poolType_ends_with?: InputMaybe<Scalars['String']>;
  poolType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolType_gt?: InputMaybe<Scalars['String']>;
  poolType_gte?: InputMaybe<Scalars['String']>;
  poolType_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_lt?: InputMaybe<Scalars['String']>;
  poolType_lte?: InputMaybe<Scalars['String']>;
  poolType_not?: InputMaybe<Scalars['String']>;
  poolType_not_contains?: InputMaybe<Scalars['String']>;
  poolType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolType_not_ends_with?: InputMaybe<Scalars['String']>;
  poolType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolType_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolType_not_starts_with?: InputMaybe<Scalars['String']>;
  poolType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolType_starts_with?: InputMaybe<Scalars['String']>;
  poolType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  priceRateProviders_?: InputMaybe<PriceRateProvider_Filter>;
  principalToken?: InputMaybe<Scalars['Bytes']>;
  principalToken_contains?: InputMaybe<Scalars['Bytes']>;
  principalToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
  principalToken_not?: InputMaybe<Scalars['Bytes']>;
  principalToken_not_contains?: InputMaybe<Scalars['Bytes']>;
  principalToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  root3Alpha?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_gt?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_gte?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  root3Alpha_lt?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_lte?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_not?: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  shares_?: InputMaybe<PoolShare_Filter>;
  snapshots_?: InputMaybe<PoolSnapshot_Filter>;
  sqrtAlpha?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_gt?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_gte?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtAlpha_lt?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_lte?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_not?: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtBeta?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_gt?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_gte?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtBeta_lt?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_lte?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_not?: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  strategyType?: InputMaybe<Scalars['Int']>;
  strategyType_gt?: InputMaybe<Scalars['Int']>;
  strategyType_gte?: InputMaybe<Scalars['Int']>;
  strategyType_in?: InputMaybe<Array<Scalars['Int']>>;
  strategyType_lt?: InputMaybe<Scalars['Int']>;
  strategyType_lte?: InputMaybe<Scalars['Int']>;
  strategyType_not?: InputMaybe<Scalars['Int']>;
  strategyType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  swapEnabled?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapEnabled_not?: InputMaybe<Scalars['Boolean']>;
  swapEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  swapFee?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapsCount?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not?: InputMaybe<Scalars['BigInt']>;
  swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swaps_?: InputMaybe<Swap_Filter>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokensList?: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not?: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_?: InputMaybe<PoolToken_Filter>;
  totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not?: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalWeight?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalWeight_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_not?: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tx?: InputMaybe<Scalars['Bytes']>;
  tx_contains?: InputMaybe<Scalars['Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_not?: InputMaybe<Scalars['Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['Bytes']>;
  tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  unitSeconds?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds_lt?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lte?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not?: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  upperTarget?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_gt?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_gte?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  upperTarget_lt?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_lte?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_not?: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  vaultID?: InputMaybe<Scalars['String']>;
  vaultID_?: InputMaybe<Balancer_Filter>;
  vaultID_contains?: InputMaybe<Scalars['String']>;
  vaultID_contains_nocase?: InputMaybe<Scalars['String']>;
  vaultID_ends_with?: InputMaybe<Scalars['String']>;
  vaultID_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vaultID_gt?: InputMaybe<Scalars['String']>;
  vaultID_gte?: InputMaybe<Scalars['String']>;
  vaultID_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_lt?: InputMaybe<Scalars['String']>;
  vaultID_lte?: InputMaybe<Scalars['String']>;
  vaultID_not?: InputMaybe<Scalars['String']>;
  vaultID_not_contains?: InputMaybe<Scalars['String']>;
  vaultID_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with?: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vaultID_not_in?: InputMaybe<Array<Scalars['String']>>;
  vaultID_not_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vaultID_starts_with?: InputMaybe<Scalars['String']>;
  vaultID_starts_with_nocase?: InputMaybe<Scalars['String']>;
  weightUpdates_?: InputMaybe<GradualWeightUpdate_Filter>;
  wrappedIndex?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_gte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_in?: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex_lt?: InputMaybe<Scalars['Int']>;
  wrappedIndex_lte?: InputMaybe<Scalars['Int']>;
  wrappedIndex_not?: InputMaybe<Scalars['Int']>;
  wrappedIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum Pool_OrderBy {
  Address = 'address',
  Amp = 'amp',
  BaseToken = 'baseToken',
  CreateTime = 'createTime',
  ExpiryTime = 'expiryTime',
  Factory = 'factory',
  HistoricalValues = 'historicalValues',
  HoldersCount = 'holdersCount',
  Id = 'id',
  LowerTarget = 'lowerTarget',
  MainIndex = 'mainIndex',
  ManagementFee = 'managementFee',
  Name = 'name',
  OracleEnabled = 'oracleEnabled',
  Owner = 'owner',
  PoolType = 'poolType',
  PriceRateProviders = 'priceRateProviders',
  PrincipalToken = 'principalToken',
  Root3Alpha = 'root3Alpha',
  Shares = 'shares',
  Snapshots = 'snapshots',
  SqrtAlpha = 'sqrtAlpha',
  SqrtBeta = 'sqrtBeta',
  StrategyType = 'strategyType',
  SwapEnabled = 'swapEnabled',
  SwapFee = 'swapFee',
  Swaps = 'swaps',
  SwapsCount = 'swapsCount',
  Symbol = 'symbol',
  Tokens = 'tokens',
  TokensList = 'tokensList',
  TotalLiquidity = 'totalLiquidity',
  TotalShares = 'totalShares',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
  TotalWeight = 'totalWeight',
  Tx = 'tx',
  UnitSeconds = 'unitSeconds',
  UpperTarget = 'upperTarget',
  VaultId = 'vaultID',
  WeightUpdates = 'weightUpdates',
  WrappedIndex = 'wrappedIndex'
}

export type PriceRateProvider = {
  __typename?: 'PriceRateProvider';
  address: Scalars['Bytes'];
  cacheDuration: Scalars['Int'];
  cacheExpiry: Scalars['Int'];
  id: Scalars['ID'];
  lastCached: Scalars['Int'];
  poolId: Pool;
  rate: Scalars['BigDecimal'];
  token: PoolToken;
};

export type PriceRateProvider_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  cacheDuration?: InputMaybe<Scalars['Int']>;
  cacheDuration_gt?: InputMaybe<Scalars['Int']>;
  cacheDuration_gte?: InputMaybe<Scalars['Int']>;
  cacheDuration_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration_lt?: InputMaybe<Scalars['Int']>;
  cacheDuration_lte?: InputMaybe<Scalars['Int']>;
  cacheDuration_not?: InputMaybe<Scalars['Int']>;
  cacheDuration_not_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_gte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_in?: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry_lt?: InputMaybe<Scalars['Int']>;
  cacheExpiry_lte?: InputMaybe<Scalars['Int']>;
  cacheExpiry_not?: InputMaybe<Scalars['Int']>;
  cacheExpiry_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  lastCached?: InputMaybe<Scalars['Int']>;
  lastCached_gt?: InputMaybe<Scalars['Int']>;
  lastCached_gte?: InputMaybe<Scalars['Int']>;
  lastCached_in?: InputMaybe<Array<Scalars['Int']>>;
  lastCached_lt?: InputMaybe<Scalars['Int']>;
  lastCached_lte?: InputMaybe<Scalars['Int']>;
  lastCached_not?: InputMaybe<Scalars['Int']>;
  lastCached_not_in?: InputMaybe<Array<Scalars['Int']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<PoolToken_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum PriceRateProvider_OrderBy {
  Address = 'address',
  CacheDuration = 'cacheDuration',
  CacheExpiry = 'cacheExpiry',
  Id = 'id',
  LastCached = 'lastCached',
  PoolId = 'poolId',
  Rate = 'rate',
  Token = 'token'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ampUpdate?: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer?: Maybe<Balancer>;
  balancerSnapshot?: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  gradualWeightUpdate?: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit?: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice?: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation?: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool?: Maybe<Pool>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
  poolShare?: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot?: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken?: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider?: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot?: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair?: Maybe<TradePair>;
  tradePairSnapshot?: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user?: Maybe<User>;
  userInternalBalance?: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAmpUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAmpUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmpUpdate_Filter>;
};


export type QueryBalancerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBalancerSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBalancerSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalancerSnapshot_Filter>;
};


export type QueryBalancersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Balancer_Filter>;
};


export type QueryGradualWeightUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGradualWeightUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
};


export type QueryJoinExitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryJoinExitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JoinExit_Filter>;
};


export type QueryLatestPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLatestPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestPrice_Filter>;
};


export type QueryManagementOperationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryManagementOperationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ManagementOperation_Filter>;
};


export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolHistoricalLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
};


export type QueryPoolHistoricalLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolShareArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolSharesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolShare_Filter>;
};


export type QueryPoolSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolSnapshot_Filter>;
};


export type QueryPoolTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolToken_Filter>;
};


export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type QueryPriceRateProviderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPriceRateProvidersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PriceRateProvider_Filter>;
};


export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPrice_Filter>;
};


export type QueryTokenSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenSnapshot_Filter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTradePairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTradePairSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTradePairSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePairSnapshot_Filter>;
};


export type QueryTradePairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradePair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePair_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserInternalBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserInternalBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserInternalBalance_Filter>;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  ampUpdate?: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer?: Maybe<Balancer>;
  balancerSnapshot?: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  gradualWeightUpdate?: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit?: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice?: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation?: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool?: Maybe<Pool>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
  poolShare?: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot?: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken?: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider?: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  token?: Maybe<Token>;
  tokenPrice?: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot?: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair?: Maybe<TradePair>;
  tradePairSnapshot?: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user?: Maybe<User>;
  userInternalBalance?: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAmpUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAmpUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmpUpdate_Filter>;
};


export type SubscriptionBalancerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBalancerSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBalancerSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BalancerSnapshot_Filter>;
};


export type SubscriptionBalancersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Balancer_Filter>;
};


export type SubscriptionGradualWeightUpdateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGradualWeightUpdatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GradualWeightUpdate_Filter>;
};


export type SubscriptionJoinExitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionJoinExitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JoinExit_Filter>;
};


export type SubscriptionLatestPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLatestPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LatestPrice_Filter>;
};


export type SubscriptionManagementOperationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionManagementOperationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ManagementOperation_Filter>;
};


export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolHistoricalLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
};


export type SubscriptionPoolHistoricalLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolShareArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolSharesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolShare_Filter>;
};


export type SubscriptionPoolSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolSnapshot_Filter>;
};


export type SubscriptionPoolTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolToken_Filter>;
};


export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type SubscriptionPriceRateProviderArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPriceRateProvidersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PriceRateProvider_Filter>;
};


export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Swap_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenPriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenPricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPrice_Filter>;
};


export type SubscriptionTokenSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenSnapshot_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTradePairArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTradePairSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTradePairSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePairSnapshot_Filter>;
};


export type SubscriptionTradePairsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradePair_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradePair_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserInternalBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserInternalBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserInternalBalance_Filter>;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  caller: Scalars['Bytes'];
  id: Scalars['ID'];
  poolId: Pool;
  timestamp: Scalars['Int'];
  tokenAmountIn: Scalars['BigDecimal'];
  tokenAmountOut: Scalars['BigDecimal'];
  tokenIn: Scalars['Bytes'];
  tokenInSym: Scalars['String'];
  tokenOut: Scalars['Bytes'];
  tokenOutSym: Scalars['String'];
  tx: Scalars['Bytes'];
  userAddress: User;
  valueUSD: Scalars['BigDecimal'];
};

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  caller?: InputMaybe<Scalars['Bytes']>;
  caller_contains?: InputMaybe<Scalars['Bytes']>;
  caller_in?: InputMaybe<Array<Scalars['Bytes']>>;
  caller_not?: InputMaybe<Scalars['Bytes']>;
  caller_not_contains?: InputMaybe<Scalars['Bytes']>;
  caller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenAmountIn?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_gt?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_gte?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountIn_lt?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_lte?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_not?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountOut?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_gt?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_gte?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountOut_lt?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_lte?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_not?: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenIn?: InputMaybe<Scalars['Bytes']>;
  tokenInSym?: InputMaybe<Scalars['String']>;
  tokenInSym_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenInSym_gt?: InputMaybe<Scalars['String']>;
  tokenInSym_gte?: InputMaybe<Scalars['String']>;
  tokenInSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_lt?: InputMaybe<Scalars['String']>;
  tokenInSym_lte?: InputMaybe<Scalars['String']>;
  tokenInSym_not?: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenInSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenIn_contains?: InputMaybe<Scalars['Bytes']>;
  tokenIn_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenIn_not?: InputMaybe<Scalars['Bytes']>;
  tokenIn_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenIn_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenOut?: InputMaybe<Scalars['Bytes']>;
  tokenOutSym?: InputMaybe<Scalars['String']>;
  tokenOutSym_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenOutSym_gt?: InputMaybe<Scalars['String']>;
  tokenOutSym_gte?: InputMaybe<Scalars['String']>;
  tokenOutSym_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_lt?: InputMaybe<Scalars['String']>;
  tokenOutSym_lte?: InputMaybe<Scalars['String']>;
  tokenOutSym_not?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with?: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenOut_contains?: InputMaybe<Scalars['Bytes']>;
  tokenOut_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenOut_not?: InputMaybe<Scalars['Bytes']>;
  tokenOut_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenOut_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx?: InputMaybe<Scalars['Bytes']>;
  tx_contains?: InputMaybe<Scalars['Bytes']>;
  tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx_not?: InputMaybe<Scalars['Bytes']>;
  tx_not_contains?: InputMaybe<Scalars['Bytes']>;
  tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  valueUSD?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  valueUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Swap_OrderBy {
  Caller = 'caller',
  Id = 'id',
  PoolId = 'poolId',
  Timestamp = 'timestamp',
  TokenAmountIn = 'tokenAmountIn',
  TokenAmountOut = 'tokenAmountOut',
  TokenIn = 'tokenIn',
  TokenInSym = 'tokenInSym',
  TokenOut = 'tokenOut',
  TokenOutSym = 'tokenOutSym',
  Tx = 'tx',
  UserAddress = 'userAddress',
  ValueUsd = 'valueUSD'
}

export type Token = {
  __typename?: 'Token';
  address: Scalars['String'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  latestPrice?: Maybe<LatestPrice>;
  latestUSDPrice?: Maybe<Scalars['BigDecimal']>;
  name?: Maybe<Scalars['String']>;
  pool?: Maybe<Pool>;
  symbol?: Maybe<Scalars['String']>;
  totalBalanceNotional: Scalars['BigDecimal'];
  totalBalanceUSD: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalVolumeNotional: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
};

export type TokenPrice = {
  __typename?: 'TokenPrice';
  amount: Scalars['BigDecimal'];
  asset: Scalars['Bytes'];
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  price: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
  timestamp: Scalars['Int'];
};

export type TokenPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolId?: InputMaybe<Scalars['String']>;
  poolId_?: InputMaybe<Pool_Filter>;
  poolId_contains?: InputMaybe<Scalars['String']>;
  poolId_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_ends_with?: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_gt?: InputMaybe<Scalars['String']>;
  poolId_gte?: InputMaybe<Scalars['String']>;
  poolId_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_lt?: InputMaybe<Scalars['String']>;
  poolId_lte?: InputMaybe<Scalars['String']>;
  poolId_not?: InputMaybe<Scalars['String']>;
  poolId_not_contains?: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with?: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with?: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poolId_starts_with?: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum TokenPrice_OrderBy {
  Amount = 'amount',
  Asset = 'asset',
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  Price = 'price',
  PricingAsset = 'pricingAsset',
  Timestamp = 'timestamp'
}

export type TokenSnapshot = {
  __typename?: 'TokenSnapshot';
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  token: Token;
  totalBalanceNotional: Scalars['BigDecimal'];
  totalBalanceUSD: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalVolumeNotional: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
};

export type TokenSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenSnapshot_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TotalBalanceNotional = 'totalBalanceNotional',
  TotalBalanceUsd = 'totalBalanceUSD',
  TotalSwapCount = 'totalSwapCount',
  TotalVolumeNotional = 'totalVolumeNotional',
  TotalVolumeUsd = 'totalVolumeUSD'
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']>;
  address_contains?: InputMaybe<Scalars['String']>;
  address_contains_nocase?: InputMaybe<Scalars['String']>;
  address_ends_with?: InputMaybe<Scalars['String']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_gt?: InputMaybe<Scalars['String']>;
  address_gte?: InputMaybe<Scalars['String']>;
  address_in?: InputMaybe<Array<Scalars['String']>>;
  address_lt?: InputMaybe<Scalars['String']>;
  address_lte?: InputMaybe<Scalars['String']>;
  address_not?: InputMaybe<Scalars['String']>;
  address_not_contains?: InputMaybe<Scalars['String']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']>;
  address_not_ends_with?: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  address_not_in?: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  address_starts_with?: InputMaybe<Scalars['String']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  latestPrice?: InputMaybe<Scalars['String']>;
  latestPrice_?: InputMaybe<LatestPrice_Filter>;
  latestPrice_contains?: InputMaybe<Scalars['String']>;
  latestPrice_contains_nocase?: InputMaybe<Scalars['String']>;
  latestPrice_ends_with?: InputMaybe<Scalars['String']>;
  latestPrice_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestPrice_gt?: InputMaybe<Scalars['String']>;
  latestPrice_gte?: InputMaybe<Scalars['String']>;
  latestPrice_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_lt?: InputMaybe<Scalars['String']>;
  latestPrice_lte?: InputMaybe<Scalars['String']>;
  latestPrice_not?: InputMaybe<Scalars['String']>;
  latestPrice_not_contains?: InputMaybe<Scalars['String']>;
  latestPrice_not_contains_nocase?: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  latestPrice_not_in?: InputMaybe<Array<Scalars['String']>>;
  latestPrice_not_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestPrice_starts_with?: InputMaybe<Scalars['String']>;
  latestPrice_starts_with_nocase?: InputMaybe<Scalars['String']>;
  latestUSDPrice?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestUSDPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Token_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  Id = 'id',
  LatestPrice = 'latestPrice',
  LatestUsdPrice = 'latestUSDPrice',
  Name = 'name',
  Pool = 'pool',
  Symbol = 'symbol',
  TotalBalanceNotional = 'totalBalanceNotional',
  TotalBalanceUsd = 'totalBalanceUSD',
  TotalSwapCount = 'totalSwapCount',
  TotalVolumeNotional = 'totalVolumeNotional',
  TotalVolumeUsd = 'totalVolumeUSD'
}

export type TradePair = {
  __typename?: 'TradePair';
  /** Token Address - Token Address */
  id: Scalars['ID'];
  token0: Token;
  token1: Token;
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};

export type TradePairSnapshot = {
  __typename?: 'TradePairSnapshot';
  id: Scalars['ID'];
  pair: TradePair;
  timestamp: Scalars['Int'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};

export type TradePairSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pair?: InputMaybe<Scalars['String']>;
  pair_?: InputMaybe<TradePair_Filter>;
  pair_contains?: InputMaybe<Scalars['String']>;
  pair_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_ends_with?: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_gt?: InputMaybe<Scalars['String']>;
  pair_gte?: InputMaybe<Scalars['String']>;
  pair_in?: InputMaybe<Array<Scalars['String']>>;
  pair_lt?: InputMaybe<Scalars['String']>;
  pair_lte?: InputMaybe<Scalars['String']>;
  pair_not?: InputMaybe<Scalars['String']>;
  pair_not_contains?: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pair_not_ends_with?: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with?: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pair_starts_with?: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TradePairSnapshot_OrderBy {
  Id = 'id',
  Pair = 'pair',
  Timestamp = 'timestamp',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume'
}

export type TradePair_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token0?: InputMaybe<Scalars['String']>;
  token0_?: InputMaybe<Token_Filter>;
  token0_contains?: InputMaybe<Scalars['String']>;
  token0_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_ends_with?: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_gt?: InputMaybe<Scalars['String']>;
  token0_gte?: InputMaybe<Scalars['String']>;
  token0_in?: InputMaybe<Array<Scalars['String']>>;
  token0_lt?: InputMaybe<Scalars['String']>;
  token0_lte?: InputMaybe<Scalars['String']>;
  token0_not?: InputMaybe<Scalars['String']>;
  token0_not_contains?: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token0_not_ends_with?: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with?: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token0_starts_with?: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1?: InputMaybe<Scalars['String']>;
  token1_?: InputMaybe<Token_Filter>;
  token1_contains?: InputMaybe<Scalars['String']>;
  token1_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_ends_with?: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_gt?: InputMaybe<Scalars['String']>;
  token1_gte?: InputMaybe<Scalars['String']>;
  token1_in?: InputMaybe<Array<Scalars['String']>>;
  token1_lt?: InputMaybe<Scalars['String']>;
  token1_lte?: InputMaybe<Scalars['String']>;
  token1_not?: InputMaybe<Scalars['String']>;
  token1_not_contains?: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token1_not_ends_with?: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with?: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token1_starts_with?: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TradePair_OrderBy {
  Id = 'id',
  Token0 = 'token0',
  Token1 = 'token1',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  sharesOwned?: Maybe<Array<PoolShare>>;
  swaps?: Maybe<Array<Swap>>;
  userInternalBalances?: Maybe<Array<UserInternalBalance>>;
};


export type UserSharesOwnedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolShare_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolShare_Filter>;
};


export type UserSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Swap_Filter>;
};


export type UserUserInternalBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserInternalBalance_Filter>;
};

export type UserInternalBalance = {
  __typename?: 'UserInternalBalance';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  token: Scalars['Bytes'];
  userAddress?: Maybe<User>;
};

export type UserInternalBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  userAddress?: InputMaybe<Scalars['String']>;
  userAddress_?: InputMaybe<User_Filter>;
  userAddress_contains?: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_gt?: InputMaybe<Scalars['String']>;
  userAddress_gte?: InputMaybe<Scalars['String']>;
  userAddress_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt?: InputMaybe<Scalars['String']>;
  userAddress_lte?: InputMaybe<Scalars['String']>;
  userAddress_not?: InputMaybe<Scalars['String']>;
  userAddress_not_contains?: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  userAddress_starts_with?: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum UserInternalBalance_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Token = 'token',
  UserAddress = 'userAddress'
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  sharesOwned_?: InputMaybe<PoolShare_Filter>;
  swaps_?: InputMaybe<Swap_Filter>;
  userInternalBalances_?: InputMaybe<UserInternalBalance_Filter>;
};

export enum User_OrderBy {
  Id = 'id',
  SharesOwned = 'sharesOwned',
  Swaps = 'swaps',
  UserInternalBalances = 'userInternalBalances'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type PoolsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type PoolsQuery = { __typename?: 'Query', pool0: Array<{ __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, createTime: number, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, wrappedIndex?: number | null, mainIndex?: number | null, lowerTarget?: string | null, upperTarget?: string | null, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null }>, pool1000: Array<{ __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, createTime: number, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, wrappedIndex?: number | null, mainIndex?: number | null, lowerTarget?: string | null, upperTarget?: string | null, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null }> };

export type PoolQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
}>;


export type PoolQuery = { __typename?: 'Query', pool?: { __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, createTime: number, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, wrappedIndex?: number | null, mainIndex?: number | null, lowerTarget?: string | null, upperTarget?: string | null, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null } | null };

export type PoolsWithoutLinearQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type PoolsWithoutLinearQuery = { __typename?: 'Query', pools: Array<{ __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null }> };

export type PoolWithoutLinearQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
}>;


export type PoolWithoutLinearQuery = { __typename?: 'Query', pool?: { __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null } | null };

export type SubgraphPoolFragment = { __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, createTime: number, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, wrappedIndex?: number | null, mainIndex?: number | null, lowerTarget?: string | null, upperTarget?: string | null, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null };

export type SubgraphPoolWithoutLinearFragment = { __typename?: 'Pool', id: string, address: string, poolType?: string | null, symbol?: string | null, name?: string | null, swapFee: string, totalWeight?: string | null, totalSwapVolume: string, totalSwapFee: string, totalLiquidity: string, totalShares: string, swapsCount: string, holdersCount: string, tokensList: Array<string>, amp?: string | null, expiryTime?: string | null, unitSeconds?: string | null, principalToken?: string | null, baseToken?: string | null, swapEnabled: boolean, tokens?: Array<{ __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string }> | null };

export type SubgraphPoolTokenFragment = { __typename?: 'PoolToken', id: string, symbol: string, name: string, decimals: number, address: string, balance: string, managedBalance: string, weight?: string | null, priceRate: string };

export type PoolHistoricalLiquiditiesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type PoolHistoricalLiquiditiesQuery = { __typename?: 'Query', poolHistoricalLiquidities: Array<{ __typename?: 'PoolHistoricalLiquidity', id: string, poolTotalShares: string, poolLiquidity: string, poolShareValue: string, pricingAsset: string, block: string, poolId: { __typename?: 'Pool', id: string } }> };

export type PoolSnapshotsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolSnapshot_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type PoolSnapshotsQuery = { __typename?: 'Query', poolSnapshots: Array<{ __typename?: 'PoolSnapshot', id: string, totalShares: string, swapVolume: string, swapFees: string, timestamp: number, pool: { __typename?: 'Pool', id: string } }> };

export type SubgraphPoolSnapshotFragment = { __typename?: 'PoolSnapshot', id: string, totalShares: string, swapVolume: string, swapFees: string, timestamp: number, pool: { __typename?: 'Pool', id: string } };

export type JoinExitsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<JoinExit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<JoinExit_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type JoinExitsQuery = { __typename?: 'Query', joinExits: Array<{ __typename?: 'JoinExit', amounts: Array<string>, id: string, sender: string, timestamp: number, tx: string, type: InvestType, user: { __typename?: 'User', id: string }, pool: { __typename?: 'Pool', id: string, tokensList: Array<string> } }> };

export type SubgraphJoinExitFragment = { __typename?: 'JoinExit', amounts: Array<string>, id: string, sender: string, timestamp: number, tx: string, type: InvestType, user: { __typename?: 'User', id: string }, pool: { __typename?: 'Pool', id: string, tokensList: Array<string> } };

export type BalancersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Balancer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Balancer_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type BalancersQuery = { __typename?: 'Query', balancers: Array<{ __typename?: 'Balancer', id: string, totalLiquidity: string, totalSwapVolume: string, totalSwapFee: string, totalSwapCount: string, poolCount: number }> };

export type SubgraphBalancerFragment = { __typename?: 'Balancer', id: string, totalLiquidity: string, totalSwapVolume: string, totalSwapFee: string, totalSwapCount: string, poolCount: number };

export type TokenPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenPrice_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type TokenPricesQuery = { __typename?: 'Query', tokenPrices: Array<{ __typename?: 'TokenPrice', id: string, asset: string, amount: string, pricingAsset: string, price: string, block: string, timestamp: number, poolId: { __typename?: 'Pool', id: string } }> };

export type SubgraphTokenPriceFragment = { __typename?: 'TokenPrice', id: string, asset: string, amount: string, pricingAsset: string, price: string, block: string, timestamp: number, poolId: { __typename?: 'Pool', id: string } };

export type TokenLatestPricesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LatestPrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LatestPrice_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type TokenLatestPricesQuery = { __typename?: 'Query', latestPrices: Array<{ __typename?: 'LatestPrice', id: string, asset: string, price: string, pricingAsset: string, poolId: { __typename?: 'Pool', id: string } }> };

export type TokenLatestPriceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TokenLatestPriceQuery = { __typename?: 'Query', latestPrice?: { __typename?: 'LatestPrice', id: string, asset: string, price: string, pricingAsset: string, poolId: { __typename?: 'Pool', id: string } } | null };

export type SubgraphTokenLatestPriceFragment = { __typename?: 'LatestPrice', id: string, asset: string, price: string, pricingAsset: string, poolId: { __typename?: 'Pool', id: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
  block?: InputMaybe<Block_Height>;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, sharesOwned?: Array<{ __typename?: 'PoolShare', balance: string, poolId: { __typename?: 'Pool', id: string } }> | null } | null };

export type UsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_Filter>;
  block?: InputMaybe<Block_Height>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, sharesOwned?: Array<{ __typename?: 'PoolShare', balance: string, poolId: { __typename?: 'Pool', id: string } }> | null }> };

export type SubgraphUserFragment = { __typename?: 'User', id: string, sharesOwned?: Array<{ __typename?: 'PoolShare', balance: string, poolId: { __typename?: 'Pool', id: string } }> | null };

export const SubgraphPoolTokenFragmentDoc = gql`
    fragment SubgraphPoolToken on PoolToken {
  id
  symbol
  name
  decimals
  address
  balance
  managedBalance
  weight
  priceRate
}
    `;
export const SubgraphPoolFragmentDoc = gql`
    fragment SubgraphPool on Pool {
  id
  address
  poolType
  symbol
  name
  swapFee
  totalWeight
  totalSwapVolume
  totalSwapFee
  totalLiquidity
  totalShares
  tokens(first: 100) {
    ...SubgraphPoolToken
  }
  swapsCount
  holdersCount
  tokensList
  totalWeight
  amp
  expiryTime
  unitSeconds
  createTime
  principalToken
  baseToken
  swapEnabled
  wrappedIndex
  mainIndex
  lowerTarget
  upperTarget
}
    ${SubgraphPoolTokenFragmentDoc}`;
export const SubgraphPoolWithoutLinearFragmentDoc = gql`
    fragment SubgraphPoolWithoutLinear on Pool {
  id
  address
  poolType
  symbol
  name
  swapFee
  totalWeight
  totalSwapVolume
  totalSwapFee
  totalLiquidity
  totalShares
  tokens(first: 1000) {
    ...SubgraphPoolToken
  }
  swapsCount
  holdersCount
  tokensList
  totalWeight
  amp
  expiryTime
  unitSeconds
  principalToken
  baseToken
  swapEnabled
}
    ${SubgraphPoolTokenFragmentDoc}`;
export const SubgraphPoolSnapshotFragmentDoc = gql`
    fragment SubgraphPoolSnapshot on PoolSnapshot {
  id
  pool {
    id
  }
  totalShares
  swapVolume
  swapFees
  timestamp
}
    `;
export const SubgraphJoinExitFragmentDoc = gql`
    fragment SubgraphJoinExit on JoinExit {
  amounts
  id
  sender
  timestamp
  tx
  type
  user {
    id
  }
  pool {
    id
    tokensList
  }
}
    `;
export const SubgraphBalancerFragmentDoc = gql`
    fragment SubgraphBalancer on Balancer {
  id
  totalLiquidity
  totalSwapVolume
  totalSwapFee
  totalSwapCount
  poolCount
}
    `;
export const SubgraphTokenPriceFragmentDoc = gql`
    fragment SubgraphTokenPrice on TokenPrice {
  id
  poolId {
    id
  }
  asset
  amount
  pricingAsset
  price
  block
  timestamp
}
    `;
export const SubgraphTokenLatestPriceFragmentDoc = gql`
    fragment SubgraphTokenLatestPrice on LatestPrice {
  id
  asset
  price
  poolId {
    id
  }
  pricingAsset
}
    `;
export const SubgraphUserFragmentDoc = gql`
    fragment SubgraphUser on User {
  id
  sharesOwned(first: 1000) {
    balance
    poolId {
      id
    }
  }
}
    `;
export const PoolsDocument = gql`
    query Pools($skip: Int, $first: Int, $orderBy: Pool_orderBy, $orderDirection: OrderDirection, $where: Pool_filter, $block: Block_height) {
  pool0: pools(
    first: 1000
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphPool
  }
  pool1000: pools(
    skip: 1000
    first: 1000
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphPool
  }
}
    ${SubgraphPoolFragmentDoc}`;
export const PoolDocument = gql`
    query Pool($id: ID!, $block: Block_height) {
  pool(id: $id, block: $block) {
    ...SubgraphPool
  }
}
    ${SubgraphPoolFragmentDoc}`;
export const PoolsWithoutLinearDocument = gql`
    query PoolsWithoutLinear($skip: Int, $first: Int, $orderBy: Pool_orderBy, $orderDirection: OrderDirection, $where: Pool_filter, $block: Block_height) {
  pools(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphPoolWithoutLinear
  }
}
    ${SubgraphPoolWithoutLinearFragmentDoc}`;
export const PoolWithoutLinearDocument = gql`
    query PoolWithoutLinear($id: ID!, $block: Block_height) {
  pool(id: $id, block: $block) {
    ...SubgraphPoolWithoutLinear
  }
}
    ${SubgraphPoolWithoutLinearFragmentDoc}`;
export const PoolHistoricalLiquiditiesDocument = gql`
    query PoolHistoricalLiquidities($skip: Int, $first: Int, $orderBy: PoolHistoricalLiquidity_orderBy, $orderDirection: OrderDirection, $where: PoolHistoricalLiquidity_filter, $block: Block_height) {
  poolHistoricalLiquidities(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    id
    poolId {
      id
    }
    poolTotalShares
    poolLiquidity
    poolShareValue
    pricingAsset
    block
  }
}
    `;
export const PoolSnapshotsDocument = gql`
    query PoolSnapshots($skip: Int, $first: Int, $orderBy: PoolSnapshot_orderBy, $orderDirection: OrderDirection, $where: PoolSnapshot_filter, $block: Block_height) {
  poolSnapshots(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphPoolSnapshot
  }
}
    ${SubgraphPoolSnapshotFragmentDoc}`;
export const JoinExitsDocument = gql`
    query JoinExits($skip: Int, $first: Int, $orderBy: JoinExit_orderBy, $orderDirection: OrderDirection, $where: JoinExit_filter, $block: Block_height) {
  joinExits(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphJoinExit
  }
}
    ${SubgraphJoinExitFragmentDoc}`;
export const BalancersDocument = gql`
    query Balancers($skip: Int, $first: Int, $orderBy: Balancer_orderBy, $orderDirection: OrderDirection, $where: Balancer_filter, $block: Block_height) {
  balancers(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphBalancer
  }
}
    ${SubgraphBalancerFragmentDoc}`;
export const TokenPricesDocument = gql`
    query TokenPrices($skip: Int, $first: Int, $orderBy: TokenPrice_orderBy, $orderDirection: OrderDirection, $where: TokenPrice_filter, $block: Block_height) {
  tokenPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphTokenPrice
  }
}
    ${SubgraphTokenPriceFragmentDoc}`;
export const TokenLatestPricesDocument = gql`
    query TokenLatestPrices($skip: Int, $first: Int, $orderBy: LatestPrice_orderBy, $orderDirection: OrderDirection, $where: LatestPrice_filter, $block: Block_height) {
  latestPrices(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphTokenLatestPrice
  }
}
    ${SubgraphTokenLatestPriceFragmentDoc}`;
export const TokenLatestPriceDocument = gql`
    query TokenLatestPrice($id: ID!) {
  latestPrice(id: $id) {
    ...SubgraphTokenLatestPrice
  }
}
    ${SubgraphTokenLatestPriceFragmentDoc}`;
export const UserDocument = gql`
    query User($id: ID!, $block: Block_height) {
  user(id: $id, block: $block) {
    ...SubgraphUser
  }
}
    ${SubgraphUserFragmentDoc}`;
export const UsersDocument = gql`
    query Users($skip: Int, $first: Int, $orderBy: User_orderBy, $orderDirection: OrderDirection, $where: User_filter, $block: Block_height) {
  users(
    skip: $skip
    first: $first
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: $where
    block: $block
  ) {
    ...SubgraphUser
  }
}
    ${SubgraphUserFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Pools(variables?: PoolsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolsQuery>(PoolsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Pools', 'query');
    },
    Pool(variables: PoolQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolQuery>(PoolDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Pool', 'query');
    },
    PoolsWithoutLinear(variables?: PoolsWithoutLinearQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolsWithoutLinearQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolsWithoutLinearQuery>(PoolsWithoutLinearDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PoolsWithoutLinear', 'query');
    },
    PoolWithoutLinear(variables: PoolWithoutLinearQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolWithoutLinearQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolWithoutLinearQuery>(PoolWithoutLinearDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PoolWithoutLinear', 'query');
    },
    PoolHistoricalLiquidities(variables?: PoolHistoricalLiquiditiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolHistoricalLiquiditiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolHistoricalLiquiditiesQuery>(PoolHistoricalLiquiditiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PoolHistoricalLiquidities', 'query');
    },
    PoolSnapshots(variables?: PoolSnapshotsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PoolSnapshotsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PoolSnapshotsQuery>(PoolSnapshotsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PoolSnapshots', 'query');
    },
    JoinExits(variables?: JoinExitsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<JoinExitsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<JoinExitsQuery>(JoinExitsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'JoinExits', 'query');
    },
    Balancers(variables?: BalancersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BalancersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BalancersQuery>(BalancersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Balancers', 'query');
    },
    TokenPrices(variables?: TokenPricesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenPricesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenPricesQuery>(TokenPricesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenPrices', 'query');
    },
    TokenLatestPrices(variables?: TokenLatestPricesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenLatestPricesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenLatestPricesQuery>(TokenLatestPricesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenLatestPrices', 'query');
    },
    TokenLatestPrice(variables: TokenLatestPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenLatestPriceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenLatestPriceQuery>(TokenLatestPriceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenLatestPrice', 'query');
    },
    User(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserQuery>(UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'User', 'query');
    },
    Users(variables?: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;