import {
  CursorBasedPagination,
  OffsetBasedPagination,
} from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories';
import { Order, OrderProductSummary } from '../models';
import { OrderBy, Sort } from '../types';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findByPageNumber({
    limit,
    pageNumber,
    sort,
    orderBy,
  }: {
    limit: number;
    pageNumber: number;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<OffsetBasedPagination<Order>> {
    const totalCountUpToLimit = await this.orderRepository.countWithLimit(
      OffsetBasedPagination.MAX_TOTAL_COUNT,
    );

    let totalCount = totalCountUpToLimit;

    if (totalCountUpToLimit < pageNumber * limit) {
      pageNumber = Math.ceil(totalCountUpToLimit / limit) || 1;
      totalCount = pageNumber * limit;
    }

    const orders = await this.orderRepository.findByOffset({
      offset: (pageNumber - 1) * limit,
      limit,
      sort,
      orderBy,
    });

    return OffsetBasedPagination.from({
      items: orders,
      totalCount,
      currentPageNumber: pageNumber,
    });
  }

  async findByCursor({
    cursor,
    limit,
  }: {
    limit: number;
    cursor?: string;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<CursorBasedPagination<Order>> {
    const orders = await this.orderRepository.findByCursor({ cursor, limit });

    return CursorBasedPagination.from({
      items: orders.map((order) => Object.assign(order, { cursor: order.id })),
      totalCount: 0,
      cursor,
      limit,
    });
  }

  async findMyOrdersByCursor(
    userId: string,
    { cursor, limit }: { cursor?: string; limit: number },
  ): Promise<CursorBasedPagination<OrderProductSummary>> {
    const orders = await this.orderRepository.findMyOrdersByCursor(userId, {
      cursor,
      limit: limit + 1,
    });
    const totalCount = await this.orderRepository.countActiveByUserId(userId);

    return CursorBasedPagination.from({
      items: orders.map((order) => Object.assign(order, { cursor: order.id })),
      totalCount,
      cursor,
      limit,
    });
  }
}
