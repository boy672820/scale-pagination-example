import { ResponseEntity } from '@libs/domain/response';
import { mock, MockProxy } from 'jest-mock-extended';
import { OrderController } from './order.controller';
import { PageOrdersUseCase } from '../../../application/order/usecases';

describe('OrderController', () => {
  let orderController: OrderController;
  let pageOrdersUseCase: MockProxy<PageOrdersUseCase>;

  beforeEach(() => {
    pageOrdersUseCase = mock<PageOrdersUseCase>();
    orderController = new OrderController(pageOrdersUseCase);

    pageOrdersUseCase.execute.mockResolvedValue({
      items: [],
      hasNextPage: false,
      hasPrevPage: false,
      size: 0,
      totalCount: 0,
    });
  });

  it('주문내역을 조회합니다.', async () => {
    const cursor = '1';
    const limit = 10;

    const result = await orderController.findAll({ cursor, limit });

    expect(result).toEqual(
      ResponseEntity.okWith({
        items: [],
        hasNextPage: false,
        hasPrevPage: false,
        size: 0,
        totalCount: 0,
      }),
    );
  });
});
