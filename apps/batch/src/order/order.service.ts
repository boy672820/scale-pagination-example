import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: OrderRepository,
  ) {}

  async bulkCreate(batchSize = 10_000): Promise<void> {
    const { orders, products, deliveries, payments } = Array(batchSize)
      .fill(null)
      .reduce<{
        orders: OrderEntity[];
        products: OrderProductEntity[];
        deliveries: OrderDeliveryEntity[];
        payments: OrderPaymentEntity[];
      }>(
        (acc) => {
          const order = OrderEntity.createFake();
          const product = OrderProductEntity.createFake();
          const delivery = OrderDeliveryEntity.createFake();
          const payment = OrderPaymentEntity.createFake();

          order.orderProductId = product.id;
          order.orderDeliveryId = delivery.id;
          order.orderPaymentId = payment.id;

          acc.orders.push(order);
          acc.products.push(product);
          acc.deliveries.push(delivery);
          acc.payments.push(payment);
          return acc;
        },
        { orders: [], products: [], deliveries: [], payments: [] },
      );

    await this.orderRepository.bulkCreate({
      orders,
      products,
      deliveries,
      payments,
    });
  }
}
