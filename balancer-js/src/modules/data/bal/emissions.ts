/**
 * Weekly Bal emissions are fixed / year according to:
 * https://docs.google.com/spreadsheets/d/1FY0gi596YWBOTeu_mrxhWcdF74SwKMNhmu0qJVgs0KI/edit#gid=0
 *
 * Using regular numbers for simplicity assuming frontend use only.
 *
 * Calculation source
 * https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerTokenAdmin.sol
 */

const INITIAL_RATE = 145000;
const START_EPOCH_TIME = 1648465251;
const RATE_REDUCTION_TIME = 365 * 86400;
const RATE_REDUCTION_COEFFICIENT = 2 ** (1 / 4);

/**
 * Weekly BAL emissions
 *
 * @param currentTimestamp used to get the epoch
 * @returns BAL emitted in a week
 */
export const weekly = (
  currentTimestamp: number = Math.round(new Date().getTime() / 1000)
): number => {
  const miningEpoch = Math.floor(
    (currentTimestamp - START_EPOCH_TIME) / RATE_REDUCTION_TIME
  );

  const rate = INITIAL_RATE * RATE_REDUCTION_COEFFICIENT ** -miningEpoch;

  return rate;
};

/**
 * Total BAL emitted in epoch (1 year)
 *
 * @param epoch starting from 0 for the first year of emissions
 * @returns BAL emitted in epoch
 */
export const total = (epoch: number): number => {
  const weeklyRate = INITIAL_RATE * RATE_REDUCTION_COEFFICIENT ** -epoch;
  const dailyRate = weeklyRate / 7;

  return dailyRate * 365;
};

/**
 * Total BAL emitted between two timestamps
 *
 * @param start starting timestamp
 * @param end ending timestamp
 * @returns BAL emitted in period
 */
export const between = (start: number, end: number): number => {
  if (start < START_EPOCH_TIME) {
    throw 'start timestamp before emission schedule deployment';
  }
  if (end < start) {
    throw 'cannot finish before starting';
  }

  let totalEmissions = 0;

  const startingEpoch = Math.floor(
    (start - START_EPOCH_TIME) / RATE_REDUCTION_TIME
  );
  const endingEpoch = Math.floor(
    (end - START_EPOCH_TIME) / RATE_REDUCTION_TIME
  );

  for (
    let currentEpoch = startingEpoch;
    currentEpoch <= endingEpoch;
    currentEpoch++
  ) {
    totalEmissions += total(currentEpoch);
  }

  // Subtract what isn't emmited within the time range
  const startingEpochEnd =
    START_EPOCH_TIME + RATE_REDUCTION_TIME * (startingEpoch + 1);
  const endingEpochStart = START_EPOCH_TIME + RATE_REDUCTION_TIME * endingEpoch;

  const secondsInStartingEpoch = startingEpochEnd - start;
  const secondsInEndingEpoch = end - endingEpochStart;

  totalEmissions -=
    (total(startingEpoch) * (RATE_REDUCTION_TIME - secondsInStartingEpoch)) /
    RATE_REDUCTION_TIME;
  totalEmissions -=
    (total(endingEpoch) * (RATE_REDUCTION_TIME - secondsInEndingEpoch)) /
    RATE_REDUCTION_TIME;

  return totalEmissions;
};
