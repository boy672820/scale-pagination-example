import { calculateDiscount } from './calculateDiscount';

describe('calculateDiscount', () => {
  describe('할인률 계산', () => {
    it('할인률을 계산합니다.', () => {
      const amount = '100.00';
      const quantity = 10;
      const discountRate = '2.5'; // 2.5% 할인

      const result = calculateDiscount({ amount, quantity, discountRate });

      expect(result).toEqual({
        originAmount: '1000',
        totalAmount: '975',
        discountAmount: '25',
      });
    });

    it('수량은 기본 1개로 설정되어 있습니다.', () => {
      const amount = '100.00';
      const discountRate = '2.5';

      const result = calculateDiscount({ amount, discountRate });

      expect(result).toEqual({
        originAmount: '100',
        totalAmount: '97.5',
        discountAmount: '2.5',
      });
    });
  });
});
