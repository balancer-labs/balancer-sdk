import { Interface } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { formatUnits } from 'ethers/lib/utils';
import { Findable } from '../types';

const vaultInterface = new Interface([
  'function getProtocolFeesCollector() view returns (address)',
]);

const protocolFeesCollectorInterface = new Interface([
  'function getSwapFeePercentage() view returns (uint)',
]);

// Using singleton here, so subsequent calls will return the same promise
let swapFeePercentagePromise: Promise<number>;

export class FeeCollectorRepository implements Findable<number> {
  vault: Contract;
  swapFeePercentage?: number;

  constructor(vaultAddress: string, private provider: Provider) {
    this.vault = new Contract(vaultAddress, vaultInterface, this.provider);
  }

  async fetch(): Promise<number> {
    const address = (await this.vault.getProtocolFeesCollector()) as string;

    const collector = new Contract(
      address,
      protocolFeesCollectorInterface,
      this.provider
    );
    const fees = (await collector.getSwapFeePercentage()) as string;

    return parseFloat(formatUnits(fees, 18));
  }

  async find(): Promise<number> {
    if (!swapFeePercentagePromise) {
      swapFeePercentagePromise = this.fetch();
    }
    this.swapFeePercentage = await swapFeePercentagePromise;

    return this.swapFeePercentage;
  }

  async findBy(): Promise<number> {
    return this.find();
  }
}
