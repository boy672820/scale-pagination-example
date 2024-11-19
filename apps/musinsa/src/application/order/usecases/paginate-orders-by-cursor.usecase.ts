import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../domain/order/services';
import { Order } from '../../../domain/order/models';
import { OrderBy, Sort } from '../../../domain/order/types';

@Injectable()
export class PaginateOrdersByCursorUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    limit,
    cursor,
    sort,
    orderBy,
  }: {
    limit: number;
    cursor?: string;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<CursorBasedPagination<Order>> {
    const pageInfo = await this.orderService.findByCursor({
      cursor,
      limit,
      sort,
      orderBy,
    });
    return pageInfo;
  }
}
