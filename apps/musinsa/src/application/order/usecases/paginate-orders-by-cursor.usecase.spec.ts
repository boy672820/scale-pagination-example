import { CursorBasedPagination } from '@libs/domain/pagination/models';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { PaginateOrdersByCursorUseCase } from './paginate-orders-by-cursor.usecase';
import { OrderService } from '../../../domain/order/services';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order } from '../../../domain/order/models';

const order = Order.from({} as any);

describe('PaginateOrdersByCursorUseCase (Integration)', () => {
  let pageOrdersUseCase: PaginateOrdersByCursorUseCase;
  let orderRepository: MockProxy<OrderRepository>;
  let app: INestApplication;

  beforeEach(async () => {
    orderRepository = mock<OrderRepository>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        PaginateOrdersByCursorUseCase,
        { provide: OrderRepository, useValue: orderRepository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    pageOrdersUseCase = moduleRef.get(PaginateOrdersByCursorUseCase);

    orderRepository.findByCursor.mockResolvedValue([order]);
  });

  describe('주문내역 조회', () => {
    it('주문내역은 페이지별로 조회합니다.', async () => {
      const cursor = '1';
      const limit = 10;

      const result = await pageOrdersUseCase.execute({ cursor, limit });

      expect(result).toBeInstanceOf(CursorBasedPagination);
    });
  });
});
