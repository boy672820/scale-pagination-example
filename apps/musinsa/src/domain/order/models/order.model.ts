import { OrderStatus } from '@libs/domain/order/types';
import { DateTime } from '@libs/domain/types';
import { Order as OrderProps } from '@libs/domain/order/models';

export class Order implements OrderProps {
  id: string;
  productId: string;
  userId: string;
  orderProductId: string;
  orderPaymentId: string;
  orderDeliveryId: string;
  orderNumber: string;
  status: OrderStatus;
  quantity: number;
  totalAmount: string;
  originAmount: string;
  discountRate?: string;
  discountAmount?: string;
  createdDate: DateTime;
  approvedDate?: DateTime;
  rejectedDate?: DateTime;

  private constructor(props: OrderProps) {
    Object.assign(this, props);
  }

  static from = (props: OrderProps): Order => new Order(props);
}
