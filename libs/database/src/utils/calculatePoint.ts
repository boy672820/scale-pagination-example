import BigNumber from 'bignumber.js';

export const calculatePoint = (amount: string, appliedRate: number): string =>
  new BigNumber(amount)
    .multipliedBy(new BigNumber(appliedRate).dividedBy(100))
    .toString();
