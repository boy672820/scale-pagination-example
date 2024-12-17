import { ResponseEntity } from '@libs/domain/response/models';
import { ApiResponse } from '@libs/domain/response/decorators';
import { CursorPaginationResponse } from '@libs/domain/pagination/dto/responses';
import { Auth, User, UserPayload } from '@libs/auth/decorators';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CursorBasedPaginationQuery } from '../dto/queries';
import { PaginateMyOrdersUseCase } from '../../../application/order/usecases';
import { OrderProductSummaryResponse } from '../dto/responses';

@ApiTags('Order')
@Controller('users')
export class UserController {
  constructor(private readonly pageMyOrdersUseCase: PaginateMyOrdersUseCase) {}

  @ApiOperation({ summary: '내 주문내역 조회' })
  @ApiResponse({ status: 200, type: CursorPaginationResponse })
  @Auth()
  @Get('me/orders')
  async findMyOrders(
    @User() user: UserPayload,
    @Query() { cursor, limit }: CursorBasedPaginationQuery,
  ) {
    const pageInfo = await this.pageMyOrdersUseCase.execute({
      userId: user.userId,
      cursor,
      limit,
    });
    return ResponseEntity.okWith(
      CursorPaginationResponse.from(pageInfo).reduceItems(
        OrderProductSummaryResponse.from,
      ),
    );
  }

  @ApiOperation({ summary: '내 주문 상세내역 조회' })
  @Auth()
  @Get('/me/orders/:id')
  async findMyOrderDetail(@Param('id') id: string) {
    return id;
  }
}
