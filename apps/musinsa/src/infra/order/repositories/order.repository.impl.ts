import { OrderEntity } from '@libs/database/entities/order';
import { Page } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order } from '../../../domain/order/models';
import { OrderMapper } from '../mappers';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly em: EntityManager) {}

  async findByPagination(id: string, first: number): Promise<Page<Order>> {
    const cursor = await this.em.findByCursor(
      OrderEntity,
      {},
      { first, after: { id }, orderBy: { id: 'asc' } },
    );
    return {
      items: OrderMapper.toModel(cursor.items),
      totalCount: cursor.totalCount,
      size: cursor.length,
      hasPrevPage: cursor.hasPrevPage,
      hasNextPage: cursor.hasNextPage,
    };
  }
}
