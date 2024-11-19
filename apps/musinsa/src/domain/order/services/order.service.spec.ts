import {
  CursorBasedPagination,
  OffsetBasedPagination,
} from '@libs/domain/pagination/models';
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
    orderRepository.findByOffset.mockResolvedValue([order]);
    orderRepository.findMyOrdersByCursor.mockResolvedValue([
      orderProductSummary,
    ]);
    orderRepository.countActiveByUserId.mockResolvedValue(0);
    orderRepository.countWithLimit.mockResolvedValue(
      OffsetBasedPagination.MAX_TOTAL_COUNT,
    );
  });

  describe('주문내역 조회 (오프셋 기반 페이지네이션)', () => {
    it('주문내역을 조회합니다.', async () => {
      const pageNumber = 3;
      const limit = 10;

      const result = await orderService.findByPageNumber({ pageNumber, limit });

      expect(result).toBeInstanceOf(OffsetBasedPagination);
      expect(result.items).toEqual([order]);
      expect(orderRepository.findByOffset).toHaveBeenCalledWith({
        offset: 20,
        limit: 10,
      });
    });

    it('최대 갯수를 초과하면 마지막 페이지로 이동합니다.', async () => {
      const pageNumber = 11;
      const limit = 1000;

      const result = await orderService.findByPageNumber({ pageNumber, limit });

      expect(result.totalCount).toBe(10000);
      expect(result.currentPageNumber).toBe(10);
      expect(orderRepository.findByOffset).toHaveBeenCalledWith({
        offset: 9000,
        limit,
      });
    });
  });

  describe('주문내역 조회 (커서 기반 페이지네이션)', () => {
    it('주문내역을 조회합니다.', async () => {
      const cursor = '1';
      const limit = 10;

      const result = await orderService.findByCursor({ cursor, limit });

      expect(result).toBeInstanceOf(CursorBasedPagination);
      expect(result.items).toEqual([order]);
      expect(orderRepository.findByCursor).toHaveBeenCalledWith({
        cursor,
        limit,
      });
    });
  });

  describe('내 주문내역 전체 조회', () => {
    it('내 주문내역을 조회합니다.', async () => {
      const userId = '1';
      const cursor = '1';
      const limit = 10;

      const result = await orderService.findMyOrdersByCursor(userId, {
        cursor,
        limit,
      });

      expect(result).toBeInstanceOf(CursorBasedPagination);
      expect(result.items).toEqual([orderProductSummary]);
      expect(orderRepository.findMyOrdersByCursor).toHaveBeenCalledWith(
        userId,
        { cursor, limit: limit + 1 },
      );
    });
  });
});
