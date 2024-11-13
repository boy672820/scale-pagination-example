import { OrderProductEntity as Entity } from '@libs/database/entities/order';
import {
  calculateDiscount,
  generateProductNumber,
} from '@libs/domain/order/utils';
import { faker } from '@faker-js/faker';
import { ulid } from 'ulid';

export class OrderProductEntity extends Entity {
  private constructor() {
    super();
  }

  static from = (
    props: Pick<
      Entity,
      | 'id'
      | 'storeName'
      | 'storeCode'
      | 'productNumber'
      | 'productName'
      | 'productSummary'
      | 'productThumbnail'
      | 'productOriginPrice'
      | 'productTotalPrice'
      | 'productDiscountRate'
      | 'productDiscountAmount'
      | 'productSizes'
      | 'productOptions'
    >,
  ): OrderProductEntity => Object.assign(new OrderProductEntity(), props);

  static createFake(): OrderProductEntity {
    const price = faker.commerce.price({ min: 900, max: 10000000, dec: 2 });
    const discountRate = faker.commerce.price({ min: 0, max: 30, dec: 0 });
    const { originAmount, totalAmount, discountAmount } = calculateDiscount({
      amount: price,
      discountRate,
    });

    return OrderProductEntity.from({
      id: ulid(),
      storeName: faker.company.name(),
      storeCode: faker.company.catchPhraseNoun(),
      productNumber: generateProductNumber(),
      productName: faker.commerce.product(),
      productSummary: faker.commerce.productDescription(),
      productThumbnail: faker.image.url(),
      productOriginPrice: originAmount,
      productTotalPrice: totalAmount,
      productDiscountRate: discountRate,
      productDiscountAmount: discountAmount,
      productSizes: {
        s: faker.number.int({ min: 0, max: 5 }),
        m: faker.number.int({ min: 0, max: 5 }),
        l: faker.number.int({ min: 0, max: 5 }),
      },
      productOptions: {
        color: faker.color.human(),
      },
    });
  }
}
