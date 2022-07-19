# Balancer Pools

Utilities that allow you to load Balancer Pool information.

All the current functions are pure, they don't contain any state and don't have 
any side effects. You pass in all information and they return the result.

## Liquidity Calculation

```js
import { BalancerSDK, Pools } from '@balancer/sdk';

// With full SDK
const balancer = new BalancerSDK(...configParams);
balancer.pools.find(poolId).liquidity();
```
