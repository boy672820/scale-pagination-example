import { Injectable } from '@nestjs/common';
import { CreateRequestContext, EntityManager } from '@mikro-orm/core';
import { OrderRepository } from './order.repository';
import { OrderEntity } from './entities';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly em: EntityManager) {}

  @CreateRequestContext()
  async bulkCreate(orders: OrderEntity[]): Promise<void> {
    await this.em.persistAndFlush(orders);
  }
}
