import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { mock, MockProxy } from 'jest-mock-extended';

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository: MockProxy<OrderRepository>;

  const order = OrderEntity.from({} as any);
  const product = OrderProductEntity.from({} as any);
  const delivery = OrderDeliveryEntity.from({} as any);
  const payment = OrderPaymentEntity.from({} as any);

  beforeEach(() => {
    orderRepository = mock<OrderRepository>();
    orderService = new OrderService(orderRepository);

    orderRepository.bulkCreate.mockResolvedValue();

    jest.spyOn(OrderEntity, 'from').mockReturnValue(order);
    jest.spyOn(OrderProductEntity, 'from').mockReturnValue(product);
    jest.spyOn(OrderDeliveryEntity, 'from').mockReturnValue(delivery);
    jest.spyOn(OrderPaymentEntity, 'from').mockReturnValue(payment);
  });

  describe('주문내역 대량 생성', () => {
    it('주문내역 생성에 성공하였습니다.', async () => {
      const batchSize = 3;

      await orderService.bulkCreate(batchSize);

      expect(orderRepository.bulkCreate).toHaveBeenCalledWith({
        orders: [order, order, order],
        products: [product, product, product],
        deliveries: [delivery, delivery, delivery],
        payments: [payment, payment, payment],
      });
    });
  });
});
