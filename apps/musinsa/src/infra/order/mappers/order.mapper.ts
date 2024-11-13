import { OrderEntity } from '@libs/database/entities/order';
import { OrderStatus } from '@libs/domain/order/types';
import { Order } from '../../../domain/order/models';

const transformStatus = (
  status: 'PENDING' | 'APPROVED' | 'REJECTED',
): OrderStatus => {
  switch (status) {
    case 'PENDING':
      return OrderStatus.Pending;
    case 'APPROVED':
      return OrderStatus.Approved;
    case 'REJECTED':
      return OrderStatus.Rejected;
  }
};

export class OrderMapper {
  static toModel = (entities: OrderEntity | OrderEntity[]) =>
    (Array.isArray(entities) ? entities : [entities]).map((entity) =>
      Order.from({
        id: entity.id,
        productId: entity.productId,
        userId: entity.userId,
        orderProductId: entity.orderProductId,
        orderPaymentId: entity.orderPaymentId,
        orderDeliveryId: entity.orderDeliveryId,
        orderNumber: entity.orderNumber,
        status: transformStatus(entity.status),
        quantity: entity.quantity,
        totalAmount: entity.totalAmount,
        originAmount: entity.originAmount,
        discountRate: entity.discountRate,
        discountAmount: entity.discountAmount,
        createdDate: entity.createdDate,
        approvedDate: entity.approvedDate,
        rejectedDate: entity.rejectedDate,
      }),
    );
}
