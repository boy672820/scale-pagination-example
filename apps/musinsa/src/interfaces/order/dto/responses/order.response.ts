import { Exclude, Expose } from 'class-transformer';

interface Props {
  id: string;
  productId: string;
  orderNumber: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  quantity: number;
  totalAmount: string;
  originAmount: string;
  discountRate?: string;
  discountAmount?: string;
  createdDate: Date;
  approvedDate?: Date;
  rejectedDate?: Date;
}

export class OrderResponse implements Props {
  @Exclude()
  private _id: string;
  @Exclude()
  private _productId: string;
  @Exclude()
  private _orderNumber: string;
  @Exclude()
  private _status: 'PENDING' | 'APPROVED' | 'REJECTED';
  @Exclude()
  private _quantity: number;
  @Exclude()
  private _totalAmount: string;
  @Exclude()
  private _originAmount: string;
  @Exclude()
  private _discountRate?: string;
  @Exclude()
  private _discountAmount?: string;
  @Exclude()
  private _createdDate: Date;
  @Exclude()
  private _approvedDate?: Date;
  @Exclude()
  private _rejectedDate?: Date;

  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get productId() {
    return this._productId;
  }
  @Expose()
  get orderNumber() {
    return this._orderNumber;
  }
  @Expose()
  get status() {
    return this._status;
  }
  @Expose()
  get quantity() {
    return this._quantity;
  }
  @Expose()
  get totalAmount() {
    return this._totalAmount;
  }
  @Expose()
  get originAmount() {
    return this._originAmount;
  }
  @Expose()
  get discountRate() {
    return this._discountRate;
  }
  @Expose()
  get discountAmount() {
    return this._discountAmount;
  }
  @Expose()
  get createdDate() {
    return this._createdDate;
  }
  @Expose()
  get approvedDate() {
    return this._approvedDate;
  }
  @Expose()
  get rejectedDate() {
    return this._rejectedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._productId = props.productId;
    this._orderNumber = props.orderNumber;
    this._status = props.status;
    this._quantity = props.quantity;
    this._totalAmount = props.totalAmount;
    this._originAmount = props.originAmount;
    this._discountRate = props.discountRate;
    this._discountAmount = props.discountAmount;
    this._createdDate = props.createdDate;
    this._approvedDate = props.approvedDate;
    this._rejectedDate = props.rejectedDate;
  }

  static from = (props: Props) => new OrderResponse(props);
}
