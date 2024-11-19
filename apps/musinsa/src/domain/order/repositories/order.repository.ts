import { Order, OrderProductSummary } from '../models';
import { OrderBy, Sort } from '../types';

export abstract class OrderRepository {
  abstract findByCursor(cursorBasedPagination: {
    cursor?: string;
    limit: number;
  }): Promise<Order[]>;
  abstract findByOffset(offsetBasedPagination: {
    offset: number;
    limit: number;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<Order[]>;
  abstract findMyOrdersByCursor(
    userId: string,
    cursorBasedPagination: { cursor?: string; limit: number },
  ): Promise<OrderProductSummary[]>;
  abstract countActiveByUserId(userId: string): Promise<number>;
  abstract countWithLimit(limit: number): Promise<number>;
}
