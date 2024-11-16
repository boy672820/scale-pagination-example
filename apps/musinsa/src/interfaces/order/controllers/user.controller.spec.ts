import { ResponseEntity } from '@libs/domain/response';
import { PaginationResponse } from '@libs/domain/pagination/dto/responses';
import { mock, MockProxy } from 'jest-mock-extended';
import { UserController } from './user.controller';
import { PageMyOrdersUseCase } from '../../../application/order/usecases';

describe('UserController', () => {
  let userController: UserController;
  let pageMyOrdersUseCase: MockProxy<PageMyOrdersUseCase>;

  beforeEach(() => {
    pageMyOrdersUseCase = mock<PageMyOrdersUseCase>();
    userController = new UserController(pageMyOrdersUseCase);

    pageMyOrdersUseCase.execute.mockResolvedValue({
      items: [],
      hasNextPage: false,
      hasPrevPage: false,
      size: 0,
      totalCount: 0,
    });
  });

  it('나의 주문내역을 조회합니다.', async () => {
    const user = { userId: '1' };
    const cursor = '1';
    const limit = 10;

    const result = await userController.findMyOrders(user, { cursor, limit });

    expect(result).toEqual(
      ResponseEntity.okWith(
        PaginationResponse.from({
          items: [],
          hasNextPage: false,
          hasPrevPage: false,
          size: 0,
          totalCount: 0,
        }),
      ),
    );
  });
});
