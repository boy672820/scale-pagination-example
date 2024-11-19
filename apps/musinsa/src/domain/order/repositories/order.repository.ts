import { Order, OrderProductSummary } from '../models';

export abstract class OrderRepository {
  abstract findByCursor(cursorBasedPagination: {
    cursor?: string;
    limit: number;
  }): Promise<Order[]>;
  abstract findByOffset(offsetBasedPagination: {
    offset: number;
    limit: number;
  }): Promise<Order[]>;
  abstract findMyOrdersByCursor(
    userId: string,
    cursorBasedPagination: { cursor?: string; limit: number },
  ): Promise<OrderProductSummary[]>;
  abstract countActiveByUserId(userId: string): Promise<number>;
  abstract countWithLimit(limit: number): Promise<number>;
}
