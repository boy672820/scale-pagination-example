import { Type } from '@nestjs/common';
import {
  PaginateMyOrdersUseCase,
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
} from './usecases';
import { FindMyOrderDetailUseCase } from './usecases/find-my-order-detail.usecase';

export const usecases: Type<any>[] = [
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
  PaginateMyOrdersUseCase,
  FindMyOrderDetailUseCase,
];
