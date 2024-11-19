import { Injectable } from '@nestjs/common';
import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { OrderService } from '../../../domain/order/services';
import { OrderProductSummary } from '../../../domain/order/models';

@Injectable()
export class PaginateMyOrdersUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    userId,
    cursor,
    limit,
  }: {
    userId: string;
    cursor?: string;
    limit: number;
  }): Promise<CursorBasedPagination<OrderProductSummary>> {
    const pageInfo = await this.orderService.findMyOrdersByCursor(userId, {
      cursor,
      limit,
    });
    return pageInfo;
  }
}
