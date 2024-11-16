import { Injectable } from '@nestjs/common';
import { PageInfo } from '@libs/domain/pagination/models';
import { OrderService } from '../../../domain/order/services';
import { OrderProductSummary } from '../../../domain/order/models';

@Injectable()
export class PageMyOrdersUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    userId,
    cursor,
    limit,
  }: {
    userId: string;
    cursor?: string;
    limit: number;
  }): Promise<PageInfo<OrderProductSummary>> {
    const pageInfo = await this.orderService.findMyOrdersByPagination(userId, {
      cursor,
      limit,
    });
    return pageInfo;
  }
}
