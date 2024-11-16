import { Exclude, Expose } from 'class-transformer';

interface Props {
  id: string;
  orderNumber: string;
  orderStatus: string;
  storeName: string;
  storeCode: string;
  productNumber: string;
  productName: string;
  productThumbnail: string;
  productSizes: object;
  productOptions: object;
  approvedDate: Date;
}

export class OrderProductSummaryResponse implements Props {
  @Exclude()
  private _id: string;
  @Exclude()
  private _orderNumber: string;
  @Exclude()
  private _orderStatus: string;
  @Exclude()
  private _storeName: string;
  @Exclude()
  private _storeCode: string;
  @Exclude()
  private _productNumber: string;
  @Exclude()
  private _productName: string;
  @Exclude()
  private _productThumbnail: string;
  @Exclude()
  private _productSizes: object;
  @Exclude()
  private _productOptions: object;
  @Exclude()
  private _approvedDate: Date;

  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get orderNumber() {
    return this._orderNumber;
  }
  @Expose()
  get orderStatus() {
    return this._orderStatus;
  }
  @Expose()
  get storeName() {
    return this._storeName;
  }
  @Expose()
  get storeCode() {
    return this._storeCode;
  }
  @Expose()
  get productNumber() {
    return this._productNumber;
  }
  @Expose()
  get productName() {
    return this._productName;
  }
  @Expose()
  get productThumbnail() {
    return this._productThumbnail;
  }
  @Expose()
  get productSizes() {
    return this._productSizes;
  }
  @Expose()
  get productOptions() {
    return this._productOptions;
  }
  @Expose()
  get approvedDate() {
    return this._approvedDate;
  }

  private constructor(props: Props) {
    this._id = props.id;
    this._orderNumber = props.orderNumber;
    this._orderStatus = props.orderStatus;
    this._storeName = props.storeName;
    this._storeCode = props.storeCode;
    this._productNumber = props.productNumber;
    this._productName = props.productName;
    this._productThumbnail = props.productThumbnail;
    this._productSizes = props.productSizes;
    this._productOptions = props.productOptions;
    this._approvedDate = props.approvedDate;
  }

  static from = (props: Props): OrderProductSummaryResponse =>
    new OrderProductSummaryResponse(props);
}
