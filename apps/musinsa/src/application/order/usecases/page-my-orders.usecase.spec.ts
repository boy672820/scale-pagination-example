import { PageInfo } from '@libs/domain/pagination/models';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { PageMyOrdersUseCase } from './page-my-orders.usecase';
import { OrderRepository } from '../../../domain/order/repositories';
import { OrderService } from '../../../domain/order/services';
import { OrderProductSummary } from '../../../domain/order/models';

const orderProductSummary = OrderProductSummary.from({} as any);

describe('PageMyOrdersUseCase (Integration)', () => {
  let pageMyOrdersUseCase: PageMyOrdersUseCase;
  let orderService: OrderService;
  let orderRepository: MockProxy<OrderRepository>;
  let app: INestApplication;

  beforeEach(async () => {
    orderRepository = mock<OrderRepository>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        PageMyOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    pageMyOrdersUseCase = moduleRef.get(PageMyOrdersUseCase);
    orderService = moduleRef.get(OrderService);

    orderRepository.findMyOrdersByCursor.mockResolvedValue([
      orderProductSummary,
    ]);
    orderRepository.count.mockResolvedValue(0);
  });

  describe('내 주문내역 조회', () => {
    it('내 주문내역을 페이지별로 조회합니다.', async () => {
      const userId = '1';
      const cursor = '1';
      const limit = 10;
      const spyOnOrderService = jest.spyOn(
        orderService,
        'findMyOrdersByPagination',
      );

      const result = await pageMyOrdersUseCase.execute({
        userId,
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
      expect(spyOnOrderService).toHaveBeenCalledWith(userId, { cursor, limit });
    });
  });
});
