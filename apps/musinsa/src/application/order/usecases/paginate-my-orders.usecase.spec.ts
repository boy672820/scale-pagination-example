import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { PaginateMyOrdersUseCase } from './paginate-my-orders.usecase';
import { OrderRepository } from '../../../domain/order/repositories';
import { OrderService } from '../../../domain/order/services';
import { OrderProductSummary } from '../../../domain/order/models';

const orderProductSummary = OrderProductSummary.from({} as any);

describe('PaginateMyOrdersUseCase (Integration)', () => {
  let pageMyOrdersUseCase: PaginateMyOrdersUseCase;
  let orderRepository: MockProxy<OrderRepository>;
  let app: INestApplication;

  beforeEach(async () => {
    orderRepository = mock<OrderRepository>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        PaginateMyOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    pageMyOrdersUseCase = moduleRef.get(PaginateMyOrdersUseCase);

    orderRepository.findMyOrdersByCursor.mockResolvedValue([
      orderProductSummary,
    ]);
    orderRepository.countActiveByUserId.mockResolvedValue(0);
  });

  describe('내 주문내역 조회', () => {
    it('내 주문내역을 페이지별로 조회합니다.', async () => {
      const userId = '1';
      const cursor = '1';
      const limit = 10;

      const result = await pageMyOrdersUseCase.execute({
        userId,
        cursor,
        limit,
      });

      expect(result).toBeInstanceOf(CursorBasedPagination);
    });
  });
});
