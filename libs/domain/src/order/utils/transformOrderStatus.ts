import { OrderStatus } from '../types';

export const transformOrderStatus = (
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
