import { generateDeliveryNumber } from './generateDeliveryNumber';

describe('generateDeliveryNumber', () => {
  it('송장번호의 최대 길이는 12입니다.', () => {
    const result = generateDeliveryNumber();

    expect(result.length).toBe(12);
  });

  it('송장번호는 중복된 번호를 생성하지 않습니다.', () => {
    const a = generateDeliveryNumber();
    const b = generateDeliveryNumber();

    expect(a).not.toEqual(b);
  });
});
