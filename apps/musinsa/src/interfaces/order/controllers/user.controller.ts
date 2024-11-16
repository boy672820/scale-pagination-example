import { ResponseEntity } from '@libs/domain/response';
import { PaginationResponse } from '@libs/domain/pagination/dto/responses';
import { Auth, User, UserPayload } from '@libs/auth/decorators';
import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from '../dto/queries';
import { PageMyOrdersUseCase } from '../../../application/order/usecases';
import { OrderProductSummaryResponse } from '../dto/responses';

@Controller('users')
export class UserController {
  constructor(private readonly pageMyOrdersUseCase: PageMyOrdersUseCase) {}

  @Auth()
  @Get('me/orders')
  async findMyOrders(
    @User() user: UserPayload,
    @Query() { cursor, limit }: PaginationQuery,
  ) {
    const pageInfo = await this.pageMyOrdersUseCase.execute({
      userId: user.userId,
      cursor,
      limit,
    });
    return ResponseEntity.okWith(
      PaginationResponse.from(pageInfo).reduceItems(
        OrderProductSummaryResponse.from,
      ),
    );
  }
}
