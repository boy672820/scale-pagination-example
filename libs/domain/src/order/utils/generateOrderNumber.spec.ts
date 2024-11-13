import { generateOrderNumber } from './generateOrderNumber';

describe('generateOrderNumber', () => {
  it('주문번호의 최대 길이는 12입니다.', () => {
    const result = generateOrderNumber();

    expect(result.length).toBe(12);
  });

  it('주문번호는 중복된 번호를 생성하지 않습니다.', () => {
    const a = generateOrderNumber();
    const b = generateOrderNumber();

    expect(a).not.toEqual(b);
  });
});
