/**
 * Display APRs for pool ids hardcoded under `const ids`
 */
import dotenv from 'dotenv';
import { BalancerSDK } from '../../src/modules/sdk.module';

dotenv.config();

const sdk = new BalancerSDK({
  network: 1,
  rpcUrl: `${process.env.ALCHEMY_URL}`,
});

const { pools } = sdk;

const ids = [
  '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080', // ethStEth
  '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014', // veBal
  '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe', // usd stable
  '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e', // btcEth
];

ids.forEach(async (id) => {
  const pool = await pools.find(id);
  if (pool) {
    const apr = await pool.apr();
    console.log(id, apr);
  } else {
    console.log(`pool ${id} not found`);
  }
});
