import * as sor from './sor';
import * as sdk from './sdk';
import * as data from './data';

const factories = { ...sor, ...sdk, data };

export { factories };
