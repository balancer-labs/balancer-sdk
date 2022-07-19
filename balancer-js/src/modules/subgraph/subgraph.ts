import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from './generated/balancer-subgraph-types';
import * as Gauges from './generated/balancer-gauges';
import * as V2 from './generated/balancer-subgraph-types';

export * from './generated/balancer-subgraph-types';

export type SubgraphClient = Sdk;
export type GaugesClient = Gauges.Sdk;
export type SubgraphLiquidityGauge = Gauges.LiquidityGauge;
export type SubgraphPool = V2.SubgraphPoolFragment;

export function createSubgraphClient(subgraphUrl: string): SubgraphClient {
  const client = new GraphQLClient(subgraphUrl);

  return getSdk(client);
}

export function createGaugesClient(url: string): GaugesClient {
  const client = new GraphQLClient(url);

  return Gauges.getSdk(client);
}
