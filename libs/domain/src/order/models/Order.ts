import { DateTime } from '../../types';
import { OrderStatus } from '../types';

export interface Order {
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
}
