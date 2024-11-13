import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { PageOrdersUseCase } from './page-orders.usecase';
import { OrderService } from '../../../domain/order/services';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order } from '../../../domain/order/models';

const order = Order.from({} as any);

describe('PageOrdersUseCase (Integration)', () => {
  let pageOrdersUseCase: PageOrdersUseCase;
  let orderRepository: MockProxy<OrderRepository>;
  let app: INestApplication;

  beforeEach(async () => {
    orderRepository = mock<OrderRepository>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        PageOrdersUseCase,
        { provide: OrderRepository, useValue: orderRepository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    pageOrdersUseCase = moduleRef.get(PageOrdersUseCase);

    orderRepository.findByPagination.mockResolvedValue([order]);
  });

  describe('주문내역 페이지 조회', () => {
    it('주문내역은 페이지별로 조회를 실시합니다.', async () => {
      const cursor = '1';
      const limit = 10;

      const result = await pageOrdersUseCase.execute({ cursor, limit });

      expect(result).toEqual([order]);
    });
  });
});
