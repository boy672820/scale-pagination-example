import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { ulid } from 'ulid';
import { calculateAmount, generateOrderNumber } from '../../utils';
import { OrderEntity } from '../../entities/order';

export class OrderFactory extends Factory<OrderEntity> {
  model = OrderEntity;

  definition(): OrderEntity {
    const status = faker.helpers.arrayElement(statuses);
    const amount = faker.commerce.price({ min: 900, max: 10000000, dec: 2 });
    const quantity = faker.number.int({ min: 1, max: 300 });
    const discountRate = faker.commerce.price({ min: 0, max: 30, dec: 0 });
    const { originAmount, totalAmount, discountAmount } = calculateAmount(
      amount,
      quantity,
      discountRate,
    );
    const createdDate = faker.date.between({
      from: '2020-01-01',
      to: '2024-11-01',
    });

    let approvedDate: Date;
    let rejectedDate: Date;

    if (status === 'APPROVED') {
      approvedDate = faker.date.between({ from: createdDate, to: new Date() });
    }

    if (status === 'REJECTED') {
      rejectedDate = faker.date.between({ from: createdDate, to: new Date() });
    }

    return {
      id: ulid(),
      productId: ulid(),
      userId: ulid(),
      orderProductId: '',
      orderPaymentId: '',
      orderDeliveryId: '',
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
    };
  }
}

const statuses = ['PENDING', 'APPROVED', 'REJECTED'] as const;
