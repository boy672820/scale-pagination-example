import { Factory } from '@mikro-orm/seeder';
import { ulid } from 'ulid';
import { faker } from '@faker-js/faker';
import { OrderPaymentEntity } from '../../entities/order';

export class OrderPaymentFactory extends Factory<OrderPaymentEntity> {
  model = OrderPaymentEntity;

  definition(): OrderPaymentEntity {
    return {
      id: ulid(),
      paymentStatus: faker.helpers.arrayElement(statuses),
      paymentMethodId: faker.helpers.rangeToNumber({ min: 1, max: 27 }),
      paymentOriginAmount: '0',
      paymentTotalAmount: '0',
      paymentDiscountAmount: '0',
      paymentDiscountRate: faker.commerce.price({ min: 0, max: 30, dec: 0 }),
      paymentSavingPoints: '0',
      isSavingPointsUsed: faker.datatype.boolean(),
      paidDate: faker.date.between({
        from: '2020-01-01',
        to: '2024-11-01',
      }),
    };
  }
}

const statuses = ['PENDING', 'COMPLETED', 'FAILED'] as const;
