import { Network } from './network';
import { BalancerNetworkConfig } from '@/types';

export const balancerVault = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

export const BALANCER_NETWORK_CONFIG: Record<Network, BalancerNetworkConfig> = {
  [Network.MAINNET]: {
    chainId: Network.MAINNET, //1
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
        lidoRelayer: '0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965',
        gaugeController: '0xc128468b7ce63ea702c1f104d55a2566b13d3abd',
        feeDistributor: '0x26743984e3357eFC59f2fd6C1aFDC310335a61c9',
      },
      tokens: {
        wrappedNativeAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        lbpRaisingTokens: [
          '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        ],
        stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
        wstETH: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
        bal: '0xba100000625a3754423978a60c9317c58a424e3d',
        veBal: '0xC128a9954e6c874eA3d62ce62B468bA073093F25',
        bbaUsd: '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {
      wETHwstETH: {
        id: '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080',
        address: '0x32296969ef14eb0c6d29669c550d4a0449130230',
      },
    },
  },
  [Network.POLYGON]: {
    chainId: Network.POLYGON, //137
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0xa1B2b503959aedD81512C37e9dce48164ec6a94d',
        gaugeController: '',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
  [Network.ARBITRUM]: {
    chainId: Network.ARBITRUM, //42161
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0x269ff446d9892c9e19082564df3f5e8741e190a1',
        gaugeController: '',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
  [Network.KOVAN]: {
    chainId: Network.KOVAN, //42
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
        gaugeController: '',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-kovan-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
  [Network.ROPSTEN]: {
    chainId: Network.ROPSTEN, //3
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
        gaugeController: '',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph: '',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
  [Network.RINKEBY]: {
    chainId: Network.RINKEBY, //4
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
        gaugeController: '',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-rinkeby-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
  [Network.GOERLI]: {
    chainId: Network.GOERLI, //5
    addresses: {
      contracts: {
        vault: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
        multicall: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
        gaugeController: '0xBB1CE49b16d55A1f2c6e88102f32144C7334B116',
        feeDistributor: '',
      },
      tokens: {
        wrappedNativeAsset: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
        bal: '',
        veBal: '',
        bbaUsd: '',
      },
    },
    urls: {
      subgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-goerli-v2',
      gaugesSubgraph:
        'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges',
    },
    pools: {},
  },
};

export const networkAddresses = (
  chainId: number
): BalancerNetworkConfig['addresses'] =>
  BALANCER_NETWORK_CONFIG[chainId as Network].addresses;
