import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../domain/order/services';
import { Order } from '../../../domain/order/models';

@Injectable()
export class PaginateOrdersByCursorUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    cursor,
    limit,
  }: {
    cursor?: string;
    limit: number;
  }): Promise<CursorBasedPagination<Order>> {
    const pageInfo = await this.orderService.findByCursor({
      cursor,
      limit,
    });
    return pageInfo;
  }
}
