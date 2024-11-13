import { Page } from '@libs/domain/pagination/models';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories';
import { Order } from '../models';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findByPagination(cursor: string, limit: number): Promise<Page<Order>> {
    const page = await this.orderRepository.findByPagination(cursor, limit);
    return page;
  }
}
