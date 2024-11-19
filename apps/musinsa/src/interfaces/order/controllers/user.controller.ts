import { ResponseEntity } from '@libs/domain/response/models';
import { ApiResponse } from '@libs/domain/response/decorators';
import { CursorPaginationResponse } from '@libs/domain/pagination/dto/responses';
import { Auth, User, UserPayload } from '@libs/auth/decorators';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CursorBasedPaginationQuery } from '../dto/queries';
import { PaginateMyOrdersUseCase } from '../../../application/order/usecases';
import { OrderProductSummaryResponse } from '../dto/responses';

@ApiTags('Order')
@Controller('users')
export class UserController {
  constructor(private readonly pageMyOrdersUseCase: PaginateMyOrdersUseCase) {}

  @ApiOperation({ summary: '내 주문내역 조회' })
  @ApiBearerAuth()
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
}
