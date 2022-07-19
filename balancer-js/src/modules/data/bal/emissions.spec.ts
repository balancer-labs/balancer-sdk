import { expect } from 'chai';
import { total, between, weekly } from './emissions';

describe('bal emissions', () => {
  describe('per week', () => {
    it('stay as initialised within first year', () => {
      const currentEpoch = Date.parse('2022-04-01') / 1000;
      const rate = weekly(currentEpoch);
      expect(rate).to.eq(145000);
    });

    it('decrease in subsequent years', () => {
      const currentEpoch = Date.parse('2023-04-01') / 1000;
      const rate = weekly(currentEpoch);
      expect(rate).to.eq(145000 / 2 ** (1 / 4));
    });
  });

  describe('within range', () => {
    it('equals to 145000 * 52 for the first year', () => {
      const start = 1648465251;
      const end = 1648465251 + 365 * 86400;
      const emissions = between(start, end);
      expect(emissions).to.eq(total(0));
    });

    it('equals to 145000 * 10 for the first 10 weeks', () => {
      const start = 1648465251;
      const end = 1648465251 + 10 * 7 * 86400;
      const emissions = between(start, end);
      expect(emissions).to.eq(145000 * 10);
    });

    it('equals to 145000 * 10 for the last 10 weeks', () => {
      const end = 1648465251 + 365 * 86400;
      const start = end - 10 * 7 * 86400;
      const emissions = between(start, end);
      expect(emissions).to.eq(145000 * 10);
    });

    it('equals to sum of total emissions for full years', () => {
      const start = 1648465251;
      const end = start + 3 * 365 * 86400;
      // Ignore precision assuming it's for frontend only
      const emissions = Math.round(between(start, end));
      const expected = Math.round(total(0) + total(1) + total(2));
      expect(emissions).to.eq(expected);
    });

    it('takes partial epochs into account', () => {
      const start = 1648465251 + 10 * 86400; // 355 days in first epoch
      const end = 1648465251 + 3 * 365 * 86400 - 100 * 86400; // 265 days in third epoch
      // Ignore precision assuming it's for frontend only
      const emissions = Math.round(between(start, end));
      const expected = Math.round(
        total(0) * (355 / 365) + total(1) + total(2) * (265 / 365)
      );
      expect(emissions).to.eq(expected);
    });
  });
});
