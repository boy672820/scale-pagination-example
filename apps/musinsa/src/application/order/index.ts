import { Type } from '@nestjs/common';
import { PageMyOrdersUseCase, PageOrdersUseCase } from './usecases';

export const usecases: Type<any>[] = [PageOrdersUseCase, PageMyOrdersUseCase];
