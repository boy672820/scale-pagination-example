import { Exclude, Expose } from 'class-transformer';
import { PageInfo } from '../../models';

export class PaginationResponse implements PageInfo<unknown> {
  @Exclude()
  private _items: unknown[];
  @Exclude()
  private _totalCount: number;
  @Exclude()
  private _size: number;
  @Exclude()
  private _hasPrevPage: boolean;
  @Exclude()
  private _hasNextPage: boolean;

  @Expose()
  get items() {
    return this._items;
  }
  @Expose()
  get totalCount() {
    return this._totalCount;
  }
  @Expose()
  get size() {
    return this._size;
  }
  @Expose()
  get hasPrevPage() {
    return this._hasPrevPage;
  }
  @Expose()
  get hasNextPage() {
    return this._hasNextPage;
  }

  private constructor(props: PageInfo<unknown>) {
    this._items = props.items;
    this._totalCount = props.totalCount;
    this._size = props.size;
    this._hasPrevPage = props.hasPrevPage;
    this._hasNextPage = props.hasNextPage;
  }

  static from = (pageInfo: PageInfo<unknown>): PaginationResponse =>
    new PaginationResponse(pageInfo);

  reduceItems(reducer: (...args: any[]) => any): PaginationResponse {
    this._items = this._items.map(reducer);
    return this;
  }
}
