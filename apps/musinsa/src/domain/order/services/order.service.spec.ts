import { mock, MockProxy } from 'jest-mock-extended';
import { OrderRepository } from '../repositories';
import { OrderService } from './order.service';
import { Order } from '../models';

const order = Order.from({} as any);

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: MockProxy<OrderRepository>;

  beforeEach(() => {
    orderRepository = mock<OrderRepository>();
    orderService = new OrderService(orderRepository);

    orderRepository.findByPagination.mockResolvedValue([order]);
  });

  describe('주문내역 조회', () => {
    it('주문내역을 조회합니다.', async () => {
      const cursor = '1';
      const limit = 10;

      const result = await orderService.findByPagination(cursor, limit);

      expect(result).toEqual([order]);
      expect(orderRepository.findByPagination).toHaveBeenCalledWith(
        cursor,
        limit,
      );
    });
  });
});
