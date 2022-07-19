import { Findable, Pool } from '@/types';
import { PoolAttribute } from './types';

export class StaticPoolRepository implements Findable<Pool, PoolAttribute> {
  constructor(private pools: Pool[]) {}

  async find(id: string): Promise<Pool | undefined> {
    return this.pools.find((pool) => {
      return pool.id.toLowerCase() === id.toLowerCase();
    });
  }

  async findBy(
    attribute: PoolAttribute,
    value: string
  ): Promise<Pool | undefined> {
    return this.pools.find((pool) => {
      return pool[attribute] === value;
    });
  }
}
