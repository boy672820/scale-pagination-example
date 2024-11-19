import {
  CursorBasedPagination,
  OffsetBasedPagination,
} from '@libs/domain/pagination/models';
import {
  CursorPaginationResponse,
  OffsetPaginationResponse,
} from '@libs/domain/pagination/dto/responses';
import { ResponseEntity } from '@libs/domain/response/models';
import { mock, MockProxy } from 'jest-mock-extended';
import { OrderController } from './order.controller';
import {
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
} from '../../../application/order/usecases';
import { OrderResponse } from '../dto/responses';
import { OrderBy, Sort } from '../../../domain/order/types';

const pageInfoByCursor = CursorBasedPagination.from({
  items: [],
  limit: 0,
  totalCount: 0,
});
const pageInfoByOffset = OffsetBasedPagination.from({
  items: [],
  totalCount: 0,
  currentPageNumber: 0,
});

describe('OrderController', () => {
  let orderController: OrderController;
  let paginateOrdersByCursorUseCase: MockProxy<PaginateOrdersByCursorUseCase>;
  let paginateOrdersByPageUseCase: MockProxy<PaginateOrdersByPageUseCase>;

  beforeEach(() => {
    paginateOrdersByCursorUseCase = mock<PaginateOrdersByCursorUseCase>();
    paginateOrdersByPageUseCase = mock<PaginateOrdersByPageUseCase>();
    orderController = new OrderController(
      paginateOrdersByCursorUseCase,
      paginateOrdersByPageUseCase,
    );

    paginateOrdersByCursorUseCase.execute.mockResolvedValue(pageInfoByCursor);
    paginateOrdersByPageUseCase.execute.mockResolvedValue(pageInfoByOffset);
  });

  describe('전체 주문내역 조회', () => {
    it('커서를 이용하여 주문내역을 조회합니다.', async () => {
      const cursor = '1';
      const limit = 10;
      const sort = Sort.CreatedDate;
      const orderBy = OrderBy.Asc;

      const result = await orderController.findAll(
        {
          cursor,
          limit,
        },
        {
          sort,
          orderBy,
        },
      );

      expect(result).toEqual(
        ResponseEntity.okWith(
          CursorPaginationResponse.from(pageInfoByCursor).reduceItems(
            OrderResponse.from,
          ),
        ),
      );
    });

    it('페이지 번호를 이용하여 주문내역을 조회합니다.', async () => {
      const pageNumber = 1;
      const limit = 10;
      const sort = Sort.CreatedDate;
      const orderBy = OrderBy.Asc;

      const result = await orderController.findAll(
        {
          pageNumber,
          limit,
        },
        {
          sort,
          orderBy,
        },
      );

      expect(result).toEqual(
        ResponseEntity.okWith(
          OffsetPaginationResponse.from(pageInfoByOffset).reduceItems(
            OrderResponse.from,
          ),
        ),
      );
    });
  });
});
