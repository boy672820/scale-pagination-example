import { OffsetBasedPagination } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/order/models';
import { OrderService } from '../../../domain/order/services';
import { OrderBy, Sort } from '../../../domain/order/types';

@Injectable()
export class PaginateOrdersByPageUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    limit,
    pageNumber,
    sort,
    orderBy,
  }: {
    limit: number;
    pageNumber?: number;
    sort: Sort;
    orderBy: OrderBy;
  }): Promise<OffsetBasedPagination<Order>> {
    const pageInfo = await this.orderService.findByPageNumber({
      pageNumber,
      limit,
      sort,
      orderBy,
    });
    return pageInfo;
  }
}
