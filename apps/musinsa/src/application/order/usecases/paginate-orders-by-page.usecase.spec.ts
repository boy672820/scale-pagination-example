import { OffsetBasedPagination } from '@libs/domain/pagination/models';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { PaginateOrdersByPageUseCase } from './paginate-orders-by-page.usecase';
import { OrderService } from '../../../domain/order/services';
import { OrderRepository } from '../../../domain/order/repositories';
import { Order } from '../../../domain/order/models';

const order = Order.from({} as any);

describe('PaginateOrdersByPageUseCase (Integration)', () => {
  let pageOrdersUseCase: PaginateOrdersByPageUseCase;
  let orderRepository: MockProxy<OrderRepository>;
  let app: INestApplication;

  beforeEach(async () => {
    orderRepository = mock<OrderRepository>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        OrderService,
        PaginateOrdersByPageUseCase,
        { provide: OrderRepository, useValue: orderRepository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    pageOrdersUseCase = moduleRef.get(PaginateOrdersByPageUseCase);

    orderRepository.findByOffset.mockResolvedValue([order]);
  });

  describe('주문내역 조회', () => {
    it('주문내역은 페이지별로 조회합니다.', async () => {
      const pageNumber = 1;
      const limit = 10;

      const result = await pageOrdersUseCase.execute({ pageNumber, limit });

      expect(result).toBeInstanceOf(OffsetBasedPagination);
    });
  });
});
