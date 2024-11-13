import { generateProductNumber } from './generateProductNumber';

describe('generateProductNumber', () => {
  it('상품번호는 최대 길이는 7입니다.', () => {
    const result = generateProductNumber();

    expect(result.length).toBe(7);
  });

  it('상품번호는 중복된 번호를 생성하지 않습니다.', () => {
    const a = generateProductNumber();
    const b = generateProductNumber();

    expect(a).not.toEqual(b);
  });
});
