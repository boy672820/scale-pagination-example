import { OrderEntity } from '@libs/database/entities/order';
import { Injectable } from '@nestjs/common';
import { EntityManager, sql } from '@mikro-orm/mysql';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order, OrderProductSummary } from '../../../domain/order/models';
import { OrderProductSummaryMapper } from '../mappers/order-product-summary.mapper';
import { OrderStatus } from '../../../../../../libs/domain/src/order/types';
import { OrderMapper } from '../mappers';
import { OrderBy, Sort } from '../../../domain/order/types';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly em: EntityManager) {}

  async findByCursor({
    cursor,
    limit,
  }: {
    cursor?: string;
    limit: number;
  }): Promise<Order[]> {
    const entities = await this.em.findAll(OrderEntity, {
      ...(cursor ? { where: { id: { $gt: cursor } } } : {}),
      orderBy: { id: 'ASC' },
      limit,
    });
    return OrderMapper.toModel(entities);
  }

  async findByOffset({
    offset,
    limit,
    sort,
    orderBy,
  }: {
    offset: number;
    limit: number;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<Order[]> {
    const temp = this.em
      .createQueryBuilder(OrderEntity)
      .select('id')
      .orderBy({ [sort === Sort.CreatedDate ? 'id' : sort]: orderBy })
      .limit(limit)
      .offset(offset);

    const entities = await this.em
      .createQueryBuilder(OrderEntity, 'o')
      .select('*')
      .join(temp, 'temp', {
        'temp.order_id': sql`o.order_id`,
      })
      .getResultList();

    return OrderMapper.toModel(entities);
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

  async countActiveByUserId(userId: string): Promise<number> {
    const result = await this.em
      .createQueryBuilder(OrderEntity)
      .count('id')
      .where({ userId, status: { $ne: OrderStatus.Rejected } })
      .execute('get');
    return result.count;
  }

  async countWithLimit(limit: number): Promise<number> {
    const temp = this.em
      .createQueryBuilder(OrderEntity)
      .select('id')
      .limit(limit);

    const result = await this.em
      .createQueryBuilder(OrderEntity, 'o')
      .count('id')
      .join(temp, 'temp', { 'temp.order_id': sql`o.order_id` })
      .getCount();

    return result;
  }
}
