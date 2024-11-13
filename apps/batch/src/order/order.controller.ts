import { Controller, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('bulk')
  async bulkCreate(@Query('size') _size?: string) {
    const size = Number(_size) || 10;
    await this.orderService.bulkCreate(size);
    return { size };
  }
}
