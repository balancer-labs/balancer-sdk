import { BigNumberish } from '@ethersproject/bignumber';
import { Network } from './lib/constants/network';
import { Contract } from '@ethersproject/contracts';
import { PoolDataService, TokenPriceService } from '@balancer-labs/sor';
import { JoinPoolAttributes } from './modules/pools/pool-types/concerns/types';

export type Address = string;

export interface BalancerSdkConfig {
  //use a known network or provide an entirely custom config
  network: Network | BalancerNetworkConfig;
  rpcUrl: string;
  //overwrite the subgraph url if you don't want to use the balancer labs maintained version
  customSubgraphUrl?: string;
  //optionally overwrite parts of the standard SOR config
  sor?: Partial<BalancerSdkSorConfig>;
}

export interface BalancerSdkSorConfig {
  //use a built-in service or provide a custom implementation of a TokenPriceService
  //defaults to coingecko
  tokenPriceService: 'coingecko' | 'subgraph' | TokenPriceService;
  //use a built-in service or provide a custom implementation of a PoolDataService
  //defaults to subgraph
  poolDataService: 'subgraph' | PoolDataService;
  //if a custom PoolDataService is provided, on chain balance fetching needs to be handled externally
  //default to true.
  fetchOnChainBalances: boolean;
}

export interface ContractAddresses {
  vault: string;
  multicall: string;
  lidoRelayer?: string;
}

export interface BalancerNetworkConfig {
  chainId: Network;
  addresses: {
    contracts: ContractAddresses;
    tokens: {
      wrappedNativeAsset: string;
      lbpRaisingTokens?: string[];
      stETH?: string;
      wstETH?: string;
    };
  };
  urls: {
    subgraph: string;
  };
  pools: {
    wETHwstETH?: PoolReference;
  };
}

export type PoolReference = {
  id: string;
  address: string;
};

export enum PoolSpecialization {
  GeneralPool = 0,
  MinimalSwapInfoPool,
  TwoTokenPool,
}

// Joins

export type JoinPoolRequest = {
  assets: string[];
  maxAmountsIn: BigNumberish[];
  userData: string;
  fromInternalBalance: boolean;
};

// Exit

export type ExitPoolRequest = {
  assets: string[];
  minAmountsOut: string[];
  userData: string;
  toInternalBalance: boolean;
};

// Balance Operations

export enum UserBalanceOpKind {
  DepositInternal = 0,
  WithdrawInternal,
  TransferInternal,
  TransferExternal,
}

export type UserBalanceOp = {
  kind: UserBalanceOpKind;
  asset: string;
  amount: BigNumberish;
  sender: string;
  recipient: string;
};

export enum PoolBalanceOpKind {
  Withdraw = 0,
  Deposit = 1,
  Update = 2,
}

export type PoolBalanceOp = {
  kind: PoolBalanceOpKind;
  poolId: string;
  token: string;
  amount: BigNumberish;
};

export interface TransactionData {
  contract?: Contract;
  function: string;
  params: string[];
  outputs?: {
    amountsIn?: string[];
    amountsOut?: string[];
  };
}

export type Currency = 'eth' | 'usd';

export type Price = { [currency in Currency]?: string };
export type TokenPrices = { [address: string]: Price };

export interface Token {
  address: string;
  decimals?: number;
  symbol?: string;
  price?: Price;
}

export interface PoolToken extends Token {
  balance: string;
  priceRate?: string;
  weight?: string | null;
}

export interface OnchainTokenData {
  balance: string;
  weight: number;
  decimals: number;
  logoURI: string | undefined;
  name: string;
  symbol: string;
}

export interface OnchainPoolData {
  tokens: Record<Address, OnchainTokenData>;
  totalSupply: string;
  decimals: number;
  swapFee: string;
  amp?: string;
  swapEnabled: boolean;
  tokenRates?: string[];
}

export enum PoolType {
  Weighted = 'Weighted',
  Investment = 'Investment',
  Stable = 'Stable',
  MetaStable = 'MetaStable',
  StablePhantom = 'StablePhantom',
  LiquidityBootstrapping = 'LiquidityBootstrapping',
  AaveLinear = 'AaveLinear',
  ERC4626Linear = 'ERC4626Linear',
  Element = 'Element',
}

export interface Pool {
  id: string;
  address: string;
  poolType: string;
  swapFee: string;
  swapEnabled?: boolean;
  owner?: string;
  factory?: string;
  tokens: PoolToken[];
  tokensList: string[];
  totalWeight?: string;
  totalLiquidity?: string;
  totalShares: string;
  totalSwapFee?: string;
  totalSwapVolume?: string;
  onchain?: OnchainPoolData;
  createTime?: number;
  mainTokens?: string[];
  wrappedTokens?: string[];
  unwrappedTokens?: string[];
  isNew?: boolean;
  volumeSnapshot?: string;
  feesSnapshot?: string;
  boost?: string;
  symbol?: string;
  amp?: string;
  principalToken?: string;
  baseToken?: string;
  expiryTime?: number;
  unitSeconds?: number;
  managementFee?: string;
  mainIndex?: number;
  wrappedIndex?: number;
  lowerTarget?: string;
  upperTarget?: string;
}

export interface PoolModel extends Pool {
  liquidity: () => Promise<string>;
  buildJoin: (
    joiner: string,
    tokensIn: string[],
    amountsIn: string[],
    slippage: string
  ) => Promise<JoinPoolAttributes>;
}
