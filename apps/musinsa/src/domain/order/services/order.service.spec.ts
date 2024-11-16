import { PageInfo } from '@libs/domain/pagination/models';
import { mock, MockProxy } from 'jest-mock-extended';
import { OrderRepository } from '../repositories';
import { OrderService } from './order.service';
import { Order, OrderProductSummary } from '../models';

const order = Order.from({} as any);
const orderProductSummary = OrderProductSummary.from({} as any);

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: MockProxy<OrderRepository>;

  beforeEach(() => {
    orderRepository = mock<OrderRepository>();
    orderService = new OrderService(orderRepository);

    orderRepository.findByCursor.mockResolvedValue([order]);
    orderRepository.findMyOrdersByCursor.mockResolvedValue([
      orderProductSummary,
    ]);
    orderRepository.count.mockResolvedValue(0);
  });

  describe('주문내역 조회', () => {
    it('주문내역을 조회합니다.', async () => {
      const cursor = '1';
      const limit = 10;

      const result = await orderService.findByPagination(cursor, limit);

      const expected: PageInfo<Order> = {
        items: [order],
        hasNextPage: expect.any(Boolean),
        hasPrevPage: expect.any(Boolean),
        size: expect.any(Number),
        totalCount: expect.any(Number),
      };
      expect({
        items: result.items,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        size: result.size,
        totalCount: result.totalCount,
      }).toEqual(expected);
      expect(orderRepository.findByCursor).toHaveBeenCalledWith(cursor, limit);
    });
  });

  describe('내 주문내역 전체 조회', () => {
    it('내 주문내역을 조회합니다.', async () => {
      const userId = '1';
      const cursor = '1';
      const limit = 10;

      const result = await orderService.findMyOrdersByPagination(userId, {
        cursor,
        limit,
      });

      const expected: PageInfo<OrderProductSummary> = {
        items: [orderProductSummary],
        hasNextPage: expect.any(Boolean),
        hasPrevPage: expect.any(Boolean),
        size: expect.any(Number),
        totalCount: expect.any(Number),
      };
      expect({
        items: result.items,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        size: result.size,
        totalCount: result.totalCount,
      }).toEqual(expected);
      expect(orderRepository.findMyOrdersByCursor).toHaveBeenCalledWith(
        userId,
        { cursor, limit: limit + 1 },
      );
    });
  });
});
