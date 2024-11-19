import { Type } from '@nestjs/common';
import {
  PaginateMyOrdersUseCase,
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
} from './usecases';

export const usecases: Type<any>[] = [
  PaginateOrdersByCursorUseCase,
  PaginateOrdersByPageUseCase,
  PaginateMyOrdersUseCase,
];
