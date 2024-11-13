import { OrderPaymentEntity as Entity } from '@libs/database/entities/order';
import { PaymentStatus } from '@libs/domain/order/types';
import { faker } from '@faker-js/faker';
import { ulid } from 'ulid';

export class OrderPaymentEntity extends Entity {
  private constructor() {
    super();
  }

  static from = (
    props: Pick<
      Entity,
      | 'id'
      | 'paymentStatus'
      | 'paymentMethodId'
      | 'paymentOriginAmount'
      | 'paymentTotalAmount'
      | 'paymentDiscountAmount'
      | 'paymentDiscountRate'
      | 'paymentSavingPoints'
      | 'isSavingPointsUsed'
      | 'paidDate'
    >,
  ): OrderPaymentEntity => Object.assign(new OrderPaymentEntity(), props);

  static createFake(): OrderPaymentEntity {
    return OrderPaymentEntity.from({
      id: ulid(),
      paymentStatus: faker.helpers.enumValue(PaymentStatus),
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
    });
  }
}
