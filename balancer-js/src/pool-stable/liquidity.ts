import {
    BigNumberish,
    formatFixed,
    parseFixed,
} from '@ethersproject/bignumber';
import { WeiPerEther as ONE, Zero } from '@ethersproject/constants';
import invariant from 'tiny-invariant';

export const calcStablePoolValue = (
    tokenBalances: BigNumberish[],
    tokenDecimals: number[],
    tokenPrices: (number | null)[]
): string =>
    // Stable pools are a special case of MetaStable pools where all tokens have pricerate of 1.
    calcMetaStablePoolValue(
        tokenBalances,
        tokenDecimals,
        tokenBalances.map(() => ONE),
        tokenPrices
    );

export const calcMetaStablePoolValue = (
    tokenBalances: BigNumberish[],
    tokenDecimals: number[],
    tokenPriceRates: BigNumberish[],
    tokenPrices: (number | null)[]
): string => {
    invariant(
        tokenBalances.length === tokenDecimals.length,
        'Input lengths mismatch'
    );
    invariant(
        tokenBalances.length === tokenPriceRates.length,
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

    let sumValue = Zero;
    let sumBalance = Zero;

    for (let i = 0; i < tokenBalances.length; i++) {
        const scaledBalance = scaledBalances[i];
        const priceRate = tokenPriceRates[i];
        const price = tokenPrices[i];

        // If a token's price is unknown, ignore it, it will be computed at the next step
        if (price === null) {
            continue;
        }

        // Apply the pricerate to convert the balance into the correct units
        sumBalance = sumBalance.add(scaledBalance.mul(priceRate).div(ONE));

        // Pricerate does not need to be applied here as it is already included in price
        const value = scaledBalance
            .mul(parseFixed(price.toFixed(18), 18))
            .div(ONE);
        sumValue = sumValue.add(value);
    }

    // If at least the partial value of the pool is known, then compute the rest of the value
    if (sumBalance.gt(0)) {
        // assume relative spot price = 1
        const avgPrice = sumValue.mul(ONE).div(sumBalance);

        for (let i = 0; i < tokenBalances.length; i++) {
            const scaledBalance = scaledBalances[i];
            const price = tokenPrices[i];

            // If a token's price is known, skip it. It has been taken into account in the prev step
            if (price !== null) {
                continue;
            }

            const value = scaledBalance.mul(avgPrice).div(ONE);
            sumValue = sumValue.add(value);
        }

        return formatFixed(sumValue, 18);
    }

    return '0';
};
