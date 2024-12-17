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
      endCursor: null,
      startCursor: null,
    });
  }

  async findByCursor({
    cursor,
    limit,
    sort,
    orderBy,
  }: {
    limit: number;
    cursor?: string;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<CursorBasedPagination<Order>> {
    const orders = await this.orderRepository.findByCursor({
      cursor,
      limit: limit + 1,
      sort,
      orderBy,
    });

    const hasNextPage = limit < orders.length;
    const hasPrevPage = typeof cursor !== 'undefined';

    if (hasNextPage) {
      orders.pop();
    }

    const first = orders[0];
    const last = orders.at(-1);

    let startCursor;
    let endCursor;

    switch (sort) {
      case Sort.TotalAmount:
        startCursor = first?.totalAmount.padStart(14, '0') + first?.id || null;
        endCursor = last?.totalAmount.padStart(14, '0') + last?.id || null;
        break;
      case Sort.ApprovedDate:
        startCursor = first?.approvedDate?.toTimesetamp() + first?.id || null;
        endCursor = last?.approvedDate?.toTimesetamp() + last?.id || null;
        break;
      case Sort.RejectedDate:
        startCursor = first?.rejectedDate?.toTimesetamp() + first?.id || null;
        endCursor = last?.rejectedDate?.toTimesetamp() + last?.id || null;
        break;
      default:
        startCursor = first?.id || null;
        endCursor = last?.id || null;
    }

    return CursorBasedPagination.from({
      items: orders,
      totalCount: 0,
      startCursor,
      endCursor,
      hasNextPage,
      hasPrevPage,
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
      startCursor: null,
      endCursor: null,
      hasNextPage: false,
      hasPrevPage: false,
    });
  }
}
