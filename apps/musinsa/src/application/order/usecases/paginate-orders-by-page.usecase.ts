import { OffsetBasedPagination } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { Order } from '../../../domain/order/models';
import { OrderService } from '../../../domain/order/services';

@Injectable()
export class PaginateOrdersByPageUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    pageNumber,
    limit,
  }: {
    pageNumber?: number;
    limit: number;
  }): Promise<OffsetBasedPagination<Order>> {
    const pageInfo = await this.orderService.findByPageNumber({
      pageNumber,
      limit,
    });
    return pageInfo;
  }
}
