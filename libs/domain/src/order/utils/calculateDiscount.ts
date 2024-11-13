import BigNumber from 'bignumber.js';

interface Settlement {
  originAmount: string;
  totalAmount: string;
  discountAmount: string;
}

export const calculateDiscount = ({
  amount,
  quantity,
  discountRate,
}: {
  amount: string;
  quantity?: number;
  discountRate: string;
}): Settlement => {
  const origin = quantity
    ? new BigNumber(amount).times(quantity)
    : new BigNumber(amount);
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
