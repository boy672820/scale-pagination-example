import { ResponseEntity } from '@libs/domain/response';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let orderController: OrderController;

  beforeEach(() => {
    orderController = new OrderController();
  });

  it('주문내역을 조회합니다.', async () => {
    const cursor = '1';
    const limit = 10;

    const result = await orderController.findOrders(cursor, limit);

    expect(result).toEqual(ResponseEntity.okWith([]));
  });
});
