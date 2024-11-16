import { Pagination, PageInfo } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories';
import { Order, OrderProductSummary } from '../models';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findByPagination(
    cursor: string,
    limit: number,
  ): Promise<PageInfo<Order>> {
    const items = await this.orderRepository.findByCursor(cursor, limit);
    return Pagination.from({ items, totalCount: 0, cursor, limit });
  }

  async findMyOrdersByPagination(
    userId: string,
    { cursor, limit }: { cursor?: string; limit: number },
  ): Promise<PageInfo<OrderProductSummary>> {
    const items = await this.orderRepository.findMyOrdersByCursor(userId, {
      cursor,
      limit: limit + 1,
    });
    const totalCount = await this.orderRepository.count();
    return Pagination.from({ items, totalCount, cursor, limit });
  }
}
