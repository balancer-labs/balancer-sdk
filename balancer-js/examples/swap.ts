/**
 *  Example showing how to find a swap and send it using ethers.
 */
import dotenv from 'dotenv';
import { BalancerSDK, Network } from '../src/index';
import mainnetTop10 from '@/test/lib/mainnet-top-10.json';
import { MockPoolDataService } from '@/test/lib/mockPool';
import { getOnChainBalances } from '@/modules/sor/pool-data/onChainData';
import { mapPools } from '@/modules/sor/pool-data/subgraphPoolDataService';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { getNetworkConfig } from '../src/modules/sdk.helpers';
import { BigNumber, parseFixed, formatFixed } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';

dotenv.config();

const { TRADER_KEY } = process.env;

const network = Network.MAINNET;
const rpcUrl = `http://127.0.0.1:8545`;
const provider = new JsonRpcProvider(rpcUrl, network);
const { addresses } = getNetworkConfig({ network, rpcUrl });
const wallet = new Wallet(TRADER_KEY as string, provider);

const tokenOut = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'; // wBTC

async function executePoolFetching() {
  const pools = mapPools(mainnetTop10);

  const onchain = await getOnChainBalances(
    pools,
    addresses.contracts.multicall,
    addresses.contracts.vault,
    provider
  );

  const mockPoolDataService = new MockPoolDataService(onchain);

  const balancer = new BalancerSDK({
    network,
    rpcUrl,
    sor: {
      tokenPriceService: 'coingecko',
      poolDataService: mockPoolDataService,
    },
  });

  const tokenOutContract = balancer.contracts.ERC20(tokenOut, provider);

  await balancer.swaps.fetchPools();

  const swapInfo = await balancer.swaps.findRouteGivenIn({
    // tokenIn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // weth
    tokenIn: AddressZero, // eth
    tokenOut,
    amount: parseFixed('1', 18),
    gasPrice: parseFixed('1', 9),
    maxPools: 4,
  });

  const userAddress = wallet.address;
  const deadline = BigNumber.from(`${Math.ceil(Date.now() / 1000) + 60}`); // 60 seconds from now
  const maxSlippage = 50; // 50 bsp = 0.5%

  const transactionAttributes = balancer.swaps.buildSwap({
    userAddress,
    swapInfo,
    kind: 0,
    deadline,
    maxSlippage,
  });

  // Extract parameters required for sendTransaction
  const { to, data, value } = transactionAttributes;

  // Execution with ethers.js
  try {
    const balanceBefore = await tokenOutContract.balanceOf(userAddress);

    await (
      await wallet.sendTransaction({
        to,
        data,
        value,
      })
    ).wait();

    // check delta
    const balanceAfter = await tokenOutContract.balanceOf(userAddress);
    console.log(
      `Amount received: ${formatFixed(
        balanceAfter.sub(balanceBefore),
        8
      )} Amount expected: ${formatFixed(swapInfo.returnAmount, 8)}`
    );
  } catch (err) {
    console.log(err);
  }
}

// yarn examples:run ./examples/swap.ts
executePoolFetching();
