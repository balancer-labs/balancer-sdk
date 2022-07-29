import dotenv from 'dotenv';
import { expect } from 'chai';
import { Network } from '@/.';
import hardhat from 'hardhat';

import { parseFixed } from '@ethersproject/bignumber';

import { forkSetup, getBalances } from '@/test/lib/utils';

/*
 * Testing on GOERLI
 * - Update hardhat.config.js with chainId = 5
 * - Update ALCHEMY_URL on .env with a goerli api key
 * - Run goerli node on terminal: npx hardhat node --fork [ALCHEMY_URL]
 * - Change `network` to Network.GOERLI
 * - Provide gaugeAddresses from goerli which can be found on subgraph: https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-goerli
 */

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl } = process.env;
const { ethers } = hardhat;

const network = Network.GOERLI;
const rpcUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, network);
const signer = provider.getSigner();

const gaugeSlots = [1]; // Info fetched using npm package slot20

// Goerli
const gaugeAddresses = ['0xf0f572ad66baacDd07d8c7ea3e0E5EFA56a76081']; // Balancer B-50WBTC-50WETH Gauge Deposit
// Mainnet
// const gaugeAddresses = ['0x68d019f64a7aa97e2d4e7363aee42251d08124fb']; // Balancer bb-a-USD Gauge Deposit

const initialBalance = '1000';
let signerAddress: string;

// Test Scenarios

describe('zaps execution', async () => {
  before(async function () {
    this.timeout(20000);

    const isVyperMapping = true; // required for gauge tokens
    await forkSetup(
      signer,
      gaugeAddresses,
      gaugeSlots,
      [parseFixed(initialBalance, 18).toString()],
      jsonRpcUrl as string,
      isVyperMapping
    );
    signerAddress = await signer.getAddress();
  });

  it('should update balances', async () => {
    const balances = await getBalances(gaugeAddresses, signer, signerAddress);
    for (let i = 0; i < balances.length; i++) {
      expect(balances[i].eq(parseFixed(initialBalance, 18))).to.be.true;
    }
  });
}).timeout(20000);
