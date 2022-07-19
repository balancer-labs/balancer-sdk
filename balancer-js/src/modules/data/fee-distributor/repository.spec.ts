import { JsonRpcProvider } from '@ethersproject/providers';
import { expect } from 'chai';
import { FeeDistributorRepository } from './repository';

describe('FeeDistributorRepository', () => {
  const repo = new FeeDistributorRepository(
    '',
    '',
    '',
    '',
    '',
    new JsonRpcProvider('', 1)
  );

  describe('.getPreviousWeek', () => {
    // Wednesday
    const now = new Date('2022-07-01 11:11:11').getTime();
    const previousWeekTs = repo.getPreviousWeek(now);
    const previousWeek = new Date(previousWeekTs * 1e3);

    it("goes back to last week's Thursday since last Thursday", () => {
      const dayOfTheWeek = previousWeek.getUTCDay();
      expect(dayOfTheWeek).to.eq(4);
      const day = previousWeek.getUTCDate();
      expect(day).to.eq(23);
      const month = previousWeek.getUTCMonth(); // returns 0..11
      expect(month).to.eq(5);
    });

    it('goes back to midnight', () => {
      const hour = previousWeek.getUTCHours();
      expect(hour).to.eq(0);
      const minutes = previousWeek.getUTCMinutes();
      expect(minutes).to.eq(0);
      const seconds = previousWeek.getUTCSeconds();
      expect(seconds).to.eq(0);
    });
  });
});
