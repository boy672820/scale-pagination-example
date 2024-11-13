import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { OrderFactory } from './factories/order.factory';
import { OrderProductFactory } from './factories/order-product.factory';
import { OrderDeliveryFactory } from './factories/order-delivery.factory';
import { OrderPaymentFactory } from './factories/order-payment.factory';
import { calculateAmount, calculatePoint } from '../utils';

export class OrderSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    new OrderFactory(em)
      .each((order) => {
        const orderProduct = new OrderProductFactory(em).makeOne();
        const orderDelivery = new OrderDeliveryFactory(em).makeOne();
        const orderPayment = new OrderPaymentFactory(em).makeOne();

        order.orderProductId = orderProduct.id;
        order.orderDeliveryId = orderDelivery.id;
        order.orderPaymentId = orderPayment.id;

        // 결제내역을 구하기 위해, 구매내역 총 금액에 결제할인을 적용합니다.
        const { originAmount, totalAmount, discountAmount } = calculateAmount(
          order.totalAmount,
          1,
          orderPayment.paymentDiscountRate,
        );
        orderPayment.paymentDiscountAmount = discountAmount;
        orderPayment.paymentOriginAmount = originAmount;
        orderPayment.paymentTotalAmount = totalAmount;
        orderPayment.paymentSavingPoints = calculatePoint(totalAmount, 2);
      })
      .make(10);
  }
}
