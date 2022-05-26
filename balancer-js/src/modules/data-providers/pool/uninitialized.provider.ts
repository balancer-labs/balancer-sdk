import { SubgraphPoolBase } from '@balancer-labs/sor';
import { PoolProvider } from './provider.interface';

export class UninitializedPoolProvider implements PoolProvider {
    find(): SubgraphPoolBase | undefined {
        throw new Error('No pool provider set');
    }

    findBy(): SubgraphPoolBase | undefined {
        throw new Error('No pool provider set');
    }

}