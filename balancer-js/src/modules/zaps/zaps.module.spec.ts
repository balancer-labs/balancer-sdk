import dotenv from 'dotenv';
import { expect } from 'chai';
import { BalancerSdkConfig, Network, BalancerSDK, Relayer } from '@/.';
import { Zaps } from './zaps.module';

dotenv.config();

const sdkConfig: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};

describe('zaps module', () => {
  context('instantiation', () => {
    it('instantiate via module', async () => {
      const relayer = new Relayer(sdkConfig);
      const zaps = new Zaps(Network.MAINNET, relayer);
      expect(zaps.network).to.deep.eq(Network.MAINNET);
    });

    it('instantiate via SDK', async () => {
      const balancer = new BalancerSDK(sdkConfig);
      expect(balancer.zaps.network).to.deep.eq(Network.MAINNET);
    });
  });
});
