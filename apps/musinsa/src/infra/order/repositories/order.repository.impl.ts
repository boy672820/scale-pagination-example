import { OrderEntity } from '@libs/database/entities/order';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order, OrderProductSummary } from '../../../domain/order/models';
import { OrderProductSummaryMapper } from '../mappers/order-product-summary.mapper';
import { OrderStatus } from '../../../../../../libs/domain/src/order/types';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly em: EntityManager) {}

  async findByCursor(): Promise<Order[]> {
    return [];
  }

  async findMyOrdersByCursor(
    userId: string,
    { cursor, limit }: { cursor?: string; limit: number },
  ): Promise<OrderProductSummary[]> {
    const entities = await this.em.findAll(OrderEntity, {
      fields: ['id', 'orderNumber', 'status', 'approvedDate'],
      populate: ['orderProduct'],
      where: {
        userId,
        status: { $ne: OrderStatus.Rejected },
        ...(cursor ? { id: { $gt: cursor } } : {}),
      },
      orderBy: { id: 'ASC' },
      limit,
    });
    return OrderProductSummaryMapper.toModel(entities);
  }

  async count(): Promise<number> {
    const result = await this.em
      .createQueryBuilder(OrderEntity)
      .count('id')
      .execute('get');
    return result.count;
  }
}
