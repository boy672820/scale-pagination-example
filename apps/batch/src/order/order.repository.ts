import { OrderEntity } from './entities';

export interface OrderRepository {
  bulkCreate(orders: OrderEntity[]): Promise<void>;
}
