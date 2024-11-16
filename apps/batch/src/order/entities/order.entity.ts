import {
  calculateDiscount,
  generateOrderNumber,
} from '@libs/domain/order/utils';
import { OrderStatus } from '@libs/domain/order/types';
import { faker } from '@faker-js/faker';
import { OrderEntity as Entity } from '@libs/database/entities/order';
import { ulid } from 'ulid';

export class OrderEntity extends Entity {
  private constructor() {
    super();
  }

  static from = (
    props: Pick<
      Entity,
      | 'id'
      | 'productId'
      | 'userId'
      | 'orderNumber'
      | 'status'
      | 'quantity'
      | 'totalAmount'
      | 'originAmount'
      | 'discountRate'
      | 'discountAmount'
      | 'createdDate'
      | 'approvedDate'
      | 'rejectedDate'
    >,
  ): OrderEntity => Object.assign(new OrderEntity(), props);

  static createFake(userId?: string): OrderEntity {
    const amount = faker.commerce.price({
      min: 900,
      max: 10000000,
      dec: 2,
    });
    const quantity = faker.number.int({ min: 1, max: 300 });
    const discountRate = faker.commerce.price({ min: 0, max: 30, dec: 0 });
    const { originAmount, totalAmount, discountAmount } = calculateDiscount({
      amount,
      quantity,
      discountRate,
    });
    const status = faker.helpers.enumValue(OrderStatus);
    const createdDate = faker.date.between({
      from: '2020-01-01',
      to: '2024-11-01',
    });

    let approvedDate: Date;
    let rejectedDate: Date;

    if (status === 'APPROVED') {
      approvedDate = faker.date.between({
        from: createdDate,
        to: new Date(),
      });
    }

    if (status === 'REJECTED') {
      rejectedDate = faker.date.between({
        from: createdDate,
        to: new Date(),
      });
    }

    const entity = OrderEntity.from({
      id: ulid(),
      productId: ulid(),
      userId: userId || ulid(),
      orderNumber: generateOrderNumber(),
      status,
      quantity,
      totalAmount,
      originAmount,
      discountRate,
      discountAmount,
      createdDate,
      approvedDate,
      rejectedDate,
    });
    return entity;
  }
}
