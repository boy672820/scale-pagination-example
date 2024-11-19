import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { ResponseEntity } from '@libs/domain/response/models';
import { CursorPaginationResponse } from '@libs/domain/pagination/dto/responses';
import { mock, MockProxy } from 'jest-mock-extended';
import { UserController } from './user.controller';
import { PaginateMyOrdersUseCase } from '../../../application/order/usecases';

const pageInfo = CursorBasedPagination.from({
  items: [],
  limit: 10,
  totalCount: 0,
});

describe('UserController', () => {
  let userController: UserController;
  let paginateMyOrdersUseCase: MockProxy<PaginateMyOrdersUseCase>;

  beforeEach(() => {
    paginateMyOrdersUseCase = mock<PaginateMyOrdersUseCase>();
    userController = new UserController(paginateMyOrdersUseCase);

    paginateMyOrdersUseCase.execute.mockResolvedValue(pageInfo);
  });

  it('나의 주문내역을 조회합니다.', async () => {
    const user = { userId: '1' };
    const cursor = '1';
    const limit = 10;

    const result = await userController.findMyOrders(user, { cursor, limit });

    expect(result).toEqual(
      ResponseEntity.okWith(
        CursorPaginationResponse.from({
          items: [],
          hasNextPage: false,
          hasPrevPage: false,
          size: 0,
          totalCount: 0,
          startCursor: null,
          endCursor: null,
        }),
      ),
    );
  });
});
