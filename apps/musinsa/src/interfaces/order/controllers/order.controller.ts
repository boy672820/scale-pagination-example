import { Controller, Get, Query } from '@nestjs/common';
import { ResponseEntity } from '@libs/domain/response';
import { PageOrdersUseCase } from '../../../application/order/usecases';
import { PaginationQuery } from '../dto/queries';
import { OrderResponse } from '../dto/responses';

@Controller('orders')
export class OrderController {
  constructor(private readonly pageOrdersUseCase: PageOrdersUseCase) {}

  @Get()
  async findAll(@Query() { cursor, limit }: PaginationQuery) {
    const { items, ...page } = await this.pageOrdersUseCase.execute({
      cursor,
      limit,
    });
    return ResponseEntity.okWith({
      ...page,
      items: items.map(OrderResponse.from),
    });
  }
}
