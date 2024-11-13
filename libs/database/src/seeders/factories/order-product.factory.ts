import { Factory } from '@mikro-orm/seeder';
import { ulid } from 'ulid';
import { faker } from '@faker-js/faker';
import { calculateAmount, generateProductNumber } from '../../utils';
import { OrderProductEntity } from '../../entities/order';

export class OrderProductFactory extends Factory<OrderProductEntity> {
  model = OrderProductEntity;

  definition(): OrderProductEntity {
    const price = faker.commerce.price({ min: 900, max: 10000000, dec: 2 });
    const discountRate = faker.commerce.price({ min: 0, max: 30, dec: 0 });
    const { originAmount, totalAmount, discountAmount } = calculateAmount(
      price,
      1,
      discountRate,
    );

    return {
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
        s: randomSizeCount(),
        m: randomSizeCount(),
        l: randomSizeCount(),
      },
      productOptions: {
        color: faker.color.human(),
      },
    };
  }
}

const randomSizeCount = () => faker.number.int({ min: 0, max: 5 });
