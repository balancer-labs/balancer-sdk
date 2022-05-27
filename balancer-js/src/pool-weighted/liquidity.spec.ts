import { toNormalizedWeights } from './normalizedWeights';
import { calcWeightedPoolValue } from './liquidity';
import { parseFixed } from '@ethersproject/bignumber';
import { expect } from 'chai';

describe('calcWeightedPoolValue', () => {
    context('when all token prices are known', () => {
        it('correctly calculate the value in the pool', () => {
            const balances = [parseFixed('100', 18), parseFixed('100', 18)];
            const decimals = [18, 18];
            const weights = toNormalizedWeights([50, 50]);
            const prices = [0.5, 1];

            const expectedPoolValue = '150.0';
            expect(
                calcWeightedPoolValue(balances, decimals, weights, prices)
            ).to.be.eq(expectedPoolValue);
        });
    });

    context('when some token prices are unknown', () => {
        it('correctly the value of the pool based on the remaining prices', () => {
            const balances = [parseFixed('100', 6), parseFixed('100', 18)];
            const decimals = [6, 18];
            const weights = toNormalizedWeights([80, 20]);
            const prices = [0.5, null];

            const expectedPoolValue = '62.5';
            expect(
                calcWeightedPoolValue(balances, decimals, weights, prices)
            ).to.be.eq(expectedPoolValue);
        });
    });
});
