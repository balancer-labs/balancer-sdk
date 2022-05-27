import { parseFixed } from '@ethersproject/bignumber';
import { expect } from 'chai';
import { calcStablePoolValue } from './liquidity';

describe('calcStablePoolValue', () => {
    context('when all token prices are known', () => {
        it('correctly calculate the value in the pool', () => {
            const balances = [parseFixed('100', 6), parseFixed('100', 18)];
            const decimals = [6, 18];
            const prices = [1, 1];

            const expectedPoolValue = '200.0';
            expect(calcStablePoolValue(balances, decimals, prices)).to.be.eq(
                expectedPoolValue
            );
        });
    });

    context('when some token prices are unknown', () => {
        it('correctly the value of the pool based on the remaining prices', () => {
            const balances = [parseFixed('100', 6), parseFixed('100', 18)];
            const decimals = [6, 18];
            const prices = [null, 1];

            const expectedPoolValue = '200.0';
            expect(calcStablePoolValue(balances, decimals, prices)).to.be.eq(
                expectedPoolValue
            );
        });
    });
});
