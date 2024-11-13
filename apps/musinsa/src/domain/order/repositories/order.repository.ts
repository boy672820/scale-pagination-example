import { Page } from '@libs/domain/pagination/models';
import { Order } from '../models';

export abstract class OrderRepository {
  abstract findByPagination(
    cursor: string,
    limit: number,
  ): Promise<Page<Order>>;
}
