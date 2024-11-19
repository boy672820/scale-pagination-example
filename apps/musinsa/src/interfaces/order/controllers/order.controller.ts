import { ApiResponse } from '@libs/domain/response/decorators';
import {
  CursorPaginationResponse,
  OffsetPaginationResponse,
} from '@libs/domain/pagination/dto/responses';
import { ResponseEntity } from '@libs/domain/response/models';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import {
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
} from '../../../application/order/usecases';
import {
  CursorBasedPaginationQuery,
  OffsetBasedPaginationQuery,
  PaginationQuery,
} from '../dto/queries';
import { OrderResponse } from '../dto/responses';
import { PaginationQueryPipe } from '../dto/pipes';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly paginateOrdersByCursorUseCase: PaginateOrdersByCursorUseCase,
    private readonly paginateOrdersByPageUseCase: PaginateOrdersByPageUseCase,
  ) {}

  @ApiOperation({
    summary: '전체 주문내역 조회',
    description:
      '전체 주문내역 조회는 Offset과 Cursor 기반 페이징을 지원합니다.',
  })
  @ApiQuery({
    type: IntersectionType(
      OffsetBasedPaginationQuery,
      CursorBasedPaginationQuery,
    ),
  })
  @ApiResponse({
    status: 200,
    type: [CursorPaginationResponse, OffsetPaginationResponse],
  })
  @Get()
  async findAll(
    @Query(PaginationQueryPipe)
    query: PaginationQuery,
  ) {
    if ('cursor' in query) {
      const pageInfo = await this.paginateOrdersByCursorUseCase.execute(query);
      return ResponseEntity.okWith(
        CursorPaginationResponse.from(pageInfo).reduceItems(OrderResponse.from),
      );
    }

    const pageInfo = await this.paginateOrdersByPageUseCase.execute(query);
    return ResponseEntity.okWith(
      OffsetPaginationResponse.from(pageInfo).reduceItems(OrderResponse.from),
    );
  }
}
