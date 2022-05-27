import {
    BigNumber,
    BigNumberish,
    formatFixed,
    parseFixed,
} from '@ethersproject/bignumber';
import { WeiPerEther as ONE, Zero } from '@ethersproject/constants';
import invariant from 'tiny-invariant';

export const calcWeightedPoolValue = (
    tokenBalances: BigNumberish[],
    tokenDecimals: number[],
    tokenWeights: BigNumberish[],
    tokenPrices: (number | null)[]
): string => {
    invariant(
        tokenBalances.length === tokenWeights.length,
        'Input lengths mismatch'
    );
    invariant(
        tokenBalances.length === tokenDecimals.length,
        'Input lengths mismatch'
    );
    invariant(
        tokenBalances.length === tokenPrices.length,
        'Input lengths mismatch'
    );

    // All token balances are scaled to 18 decimals
    const scaledBalances = tokenBalances.map((balance, i) =>
        parseFixed(balance.toString(), 18 - tokenDecimals[i])
    );

    let sumWeight = Zero;
    let sumValue = Zero;

    for (let i = 0; i < tokenBalances.length; i++) {
        const scaledBalance = scaledBalances[i];
        const weight = tokenWeights[i];
        const price = tokenPrices[i];

        // If a token's price is unknown, ignore it. It will be computed at the next step
        if (price === null) {
            continue;
        }

        const value = scaledBalance
            .mul(parseFixed(price.toFixed(18), 18))
            .div(ONE);
        sumValue = sumValue.add(value);
        sumWeight = sumWeight.add(weight);
    }

    // Scale the known value of x% of the pool to get value of 100% of the pool.
    const totalWeight = tokenWeights.reduce(
        (total: BigNumber, weight) => total.add(weight),
        Zero
    );
    if (sumWeight.gt(0)) {
        const liquidity = sumValue.mul(totalWeight).div(sumWeight);
        return formatFixed(liquidity, 18);
    }

    return '0';
};
