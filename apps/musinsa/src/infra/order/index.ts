import { Provider } from '@nestjs/common';
import { OrderRepository } from '../../domain/order/repositories';
import { OrderRepositoryImpl } from './repositories/order.repository.impl';

export const repositories: Provider[] = [
  {
    provide: OrderRepository,
    useClass: OrderRepositoryImpl,
  },
];
