import { Order, OrderProductSummary } from '../models';

export abstract class OrderRepository {
  abstract findByCursor(cursor: string, limit: number): Promise<Order[]>;
  abstract findMyOrdersByCursor(
    userId: string,
    cursorBasedPagination: { cursor?: string; limit: number },
  ): Promise<OrderProductSummary[]>;
  abstract count(): Promise<number>;
}
