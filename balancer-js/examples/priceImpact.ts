import { formatFixed } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import dotenv from 'dotenv';
import { BalancerSDK, Network, BalancerSdkConfig, PoolModel } from '../src/index';
import { ADDRESSES } from '../src/test/lib/constants';
import { forkSetup } from '../src/test/lib/utils';

dotenv.config();
const { ALCHEMY_URL: jsonRpcUrl } = process.env;

/*
Example showing how to use SDK to get price impact for a join or exit operation.
*/

async function getPriceImpact() {
  const network = Network.MAINNET;
  const rpcUrl = 'http://127.0.0.1:8545';
  const provider = new JsonRpcProvider(rpcUrl, network);

  const WBTCWETHId =
    '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e'; // 50/50 WBTC/WETH Pool
  const staBal3Id =
    '0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000063';


  const sdkConfig = {
    network,
    rpcUrl,
  };
  const balancer = new BalancerSDK(sdkConfig);

  // Use SDK to find pool info
  const pool: PoolModel | undefined = await balancer.poolsProvider.find(WBTCWETHId);
  if (!pool) throw new Error('Pool not found');

  const priceImpactWBTCWETH = await pool.priceImpact(
    pool,
    ['100000000000000000000', '100000000'],
    '99430576622436571714692'
  );
  console.log(priceImpactWBTCWETH); 

  const pool2: PoolModel | undefined = await balancer.poolsProvider.find(staBal3Id);
  if (!pool2) throw new Error('Pool not found');

  const priceImpactStaBal3 = await pool2.priceImpact(
    pool2,
    ['100000000000000000000', '100000000', '190000000'],
    '376972471880969684010'
  );
  console.log(priceImpactStaBal3); 
}

// yarn examples:run ./examples/priceImpact.ts
getPriceImpact();
