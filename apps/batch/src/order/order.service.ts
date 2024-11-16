import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';
import { ulid } from 'ulid';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: OrderRepository,
  ) {}

  async bulkCreate(batchSize = 10_000): Promise<void> {
    const userId = ulid();

    const orders = Array(batchSize)
      .fill(null)
      .map<OrderEntity>(() => {
        const order = OrderEntity.createFake(userId);
        const product = OrderProductEntity.createFake();
        const delivery = OrderDeliveryEntity.createFake();
        const payment = OrderPaymentEntity.createFake();

        order.orderProduct = product;
        order.orderDelivery = delivery;
        order.orderPayment = payment;
        return order;
      });

    await this.orderRepository.bulkCreate(orders);
  }
}
