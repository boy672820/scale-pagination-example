import BigNumber from 'bignumber.js';

interface Settlement {
  originAmount: string;
  totalAmount: string;
  discountAmount: string;
}

export const calculateAmount = (
  amount: string,
  quantity: number,
  discountRate: string,
): Settlement => {
  const origin = new BigNumber(amount).times(quantity);
  const discount = origin.multipliedBy(
    new BigNumber(discountRate).dividedBy(100),
  );
  const total = origin.minus(discount);

  return {
    originAmount: origin.toString(),
    totalAmount: total.toString(),
    discountAmount: discount.toString(),
  };
};
