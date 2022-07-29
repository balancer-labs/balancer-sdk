import { Network } from '@/lib/constants/network';
import { Migrations } from './migrations';

export class Zaps {
  public migrations: Migrations;

  constructor(public network: Network) {
    this.migrations = new Migrations(network as 1 | 5);
  }
}
