import { Page } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../domain/order/services';
import { Order } from '../../../domain/order/models';

@Injectable()
export class PageOrdersUseCase {
  constructor(private readonly orderService: OrderService) {}

  async execute({
    cursor,
    limit,
  }: {
    cursor: string;
    limit: number;
  }): Promise<Page<Order>> {
    const page = await this.orderService.findByPagination(cursor, limit);
    return page;
  }
}
