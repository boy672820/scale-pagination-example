import { OrderStatus } from '@libs/domain/order/types';

interface OrderProductSummaryProps {
  id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  storeName: string;
  storeCode: string;
  productNumber: string;
  productName: string;
  productThumbnail: string;
  productSizes: object;
  productOptions: object;
  approvedDate: Date;
}

export class OrderProductSummary implements OrderProductSummaryProps {
  id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  storeName: string;
  storeCode: string;
  productNumber: string;
  productName: string;
  productThumbnail: string;
  productSizes: object;
  productOptions: object;
  approvedDate: Date;

  private constructor(props: OrderProductSummaryProps) {
    Object.assign(this, props);
  }

  static from = (props: OrderProductSummaryProps): OrderProductSummary =>
    new OrderProductSummary(props);
}
