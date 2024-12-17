import { Money } from '@libs/domain/types';
import {
  DeliveryStatus,
  OrderStatus,
  PaymentStatus,
} from '@libs/domain/order/types';

interface Props {
  id: string;
  productId: string;
  orderNumber: string;
  status: OrderStatus;
  quantity: string;
  totalAmount: Money;
  originAmount: Money;
  discountRate: string;
  discountAmount: Money;
  storeName: string;
  storeCode: string;
  productNumber: string;
  productName: string;
  productThumbnail: string;
  productTotalPrice: string;
  productSizes: object;
  productOptions?: object;
  deliveryNumber: string;
  deliverystatus: DeliveryStatus;
  receiverRealname: string;
  address: string;
  addressDetail?: string;
  zipCode?: string;
  paymentStatus: PaymentStatus;
  paymentMethodName: string;
  paymentOriginAmount: Money;
  paymentTotalAmount: Money;
  paymentDiscountAmount?: Money;
  paymentDiscountRate?: string;
  paymentSavingPoints?: Money;
  isSavingPointsUsed: boolean;
  createDate: Date;
  approvedDate?: Date;
  rejectedDate?: Date;
  paidDate: Date;
}

export class OrderDetail implements Props {
  private _id: string;
  private _productId: string;
  private _orderNumber: string;
  private _status: OrderStatus;
  private _quantity: string;
  private _totalAmount: Money;
  private _originAmount: Money;
  private _discountRate: string;
  private _discountAmount: Money;
  private _storeName: string;
  private _storeCode: string;
  private _productNumber: string;
  private _productName: string;
  private _productThumbnail: string;
  private _productTotalPrice: string;
  private _productSizes: object;
  private _productOptions?: object;
  private _deliveryNumber: string;
  private _deliverystatus: DeliveryStatus;
  private _receiverRealname: string;
  private _address: string;
  private _addressDetail?: string;
  private _zipCode?: string;
  private _paymentStatus: PaymentStatus;
  private _paymentMethodName: string;
  private _paymentOriginAmount: Money;
  private _paymentTotalAmount: Money;
  private _paymentDiscountAmount?: Money;
  private _paymentDiscountRate?: string;
  private _paymentSavingPoints?: Money;
  private _isSavingPointsUsed: boolean;
  private _createDate: Date;
  private _approvedDate?: Date;
  private _rejectedDate?: Date;
  private _paidDate: Date;

  get id() {
    return this._id;
  }
  get productId() {
    return this._productId;
  }
  get orderNumber() {
    return this._orderNumber;
  }
  get status() {
    return this._status;
  }
  get quantity() {
    return this._quantity;
  }
  get totalAmount() {
    return this._totalAmount;
  }
  get originAmount() {
    return this._originAmount;
  }
  get discountRate() {
    return this._discountRate;
  }
  get discountAmount() {
    return this._discountAmount;
  }
  get storeName() {
    return this._storeName;
  }
  get storeCode() {
    return this._storeCode;
  }
  get productNumber() {
    return this._productNumber;
  }
  get productName() {
    return this._productName;
  }
  get productThumbnail() {
    return this._productThumbnail;
  }
  get productTotalPrice() {
    return this._productTotalPrice;
  }
  get productSizes() {
    return this._productSizes;
  }
  get productOptions() {
    return this._productOptions;
  }
  get deliveryNumber() {
    return this._deliveryNumber;
  }
  get deliverystatus() {
    return this._deliverystatus;
  }
  get receiverRealname() {
    return this._receiverRealname;
  }
  get address() {
    return this._address;
  }
  get addressDetail() {
    return this._addressDetail;
  }
  get zipCode() {
    return this._zipCode;
  }
  get paymentStatus() {
    return this._paymentStatus;
  }
  get paymentMethodName() {
    return this._paymentMethodName;
  }
  get paymentOriginAmount() {
    return this._paymentOriginAmount;
  }
  get paymentTotalAmount() {
    return this._paymentTotalAmount;
  }
  get paymentDiscountAmount() {
    return this._paymentDiscountAmount;
  }
  get paymentDiscountRate() {
    return this._paymentDiscountRate;
  }
  get paymentSavingPoints() {
    return this._paymentSavingPoints;
  }
  get isSavingPointsUsed() {
    return this._isSavingPointsUsed;
  }
  get createDate() {
    return this._createDate;
  }
  get approvedDate() {
    return this._approvedDate;
  }
  get rejectedDate() {
    return this._rejectedDate;
  }
  get paidDate() {
    return this._paidDate;
  }

  private constructor(props: Props) {
    Object.assign(this, props);
  }

  static from = (props: Props): OrderDetail => new OrderDetail(props);
}
