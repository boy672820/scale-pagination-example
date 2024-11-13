import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';

export interface OrderRepository {
  bulkCreate(entities: {
    orders: OrderEntity[];
    products: OrderProductEntity[];
    deliveries: OrderDeliveryEntity[];
    payments: OrderPaymentEntity[];
  }): Promise<void>;
}
