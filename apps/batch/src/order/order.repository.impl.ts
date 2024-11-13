import { Injectable } from '@nestjs/common';
import { CreateRequestContext, EntityManager } from '@mikro-orm/core';
import { OrderRepository } from './order.repository';
import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly em: EntityManager) {}

  @CreateRequestContext()
  async bulkCreate({
    orders,
    products,
    deliveries,
    payments,
  }: {
    orders: OrderEntity[];
    products: OrderProductEntity[];
    deliveries: OrderDeliveryEntity[];
    payments: OrderPaymentEntity[];
  }): Promise<void> {
    await Promise.all([
      this.em.persistAndFlush(orders),
      this.em.persistAndFlush(products),
      this.em.persistAndFlush(deliveries),
      this.em.persistAndFlush(payments),
    ]);
  }
}
