import { transformOrderStatus } from '@libs/domain/order/utils';
import { OrderEntity } from '@libs/database/entities/order';
import { Order } from '../../../domain/order/models';
import { DateTime } from '@libs/domain/types';

export class OrderMapper {
  static toModel = (entities: OrderEntity | OrderEntity[]) =>
    (Array.isArray(entities) ? entities : [entities]).map((entity) =>
      Order.from({
        id: entity.id,
        productId: entity.productId,
        userId: entity.userId,
        orderProductId: entity.orderProduct.id,
        orderPaymentId: entity.orderPayment.id,
        orderDeliveryId: entity.orderDelivery.id,
        orderNumber: entity.orderNumber,
        status: transformOrderStatus(entity.status),
        quantity: entity.quantity,
        totalAmount: entity.totalAmount,
        originAmount: entity.originAmount,
        discountRate: entity.discountRate,
        discountAmount: entity.discountAmount,
        createdDate: DateTime.fromDate(entity.createdDate),
        approvedDate: entity.approvedDate
          ? DateTime.fromDate(entity.approvedDate)
          : null,
        rejectedDate: entity.rejectedDate
          ? DateTime.fromDate(entity.rejectedDate)
          : null,
      }),
    );
}
