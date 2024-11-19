export interface PageInfo<T> {
  items: T[];
  totalCount: number;
  size: number;
}

export abstract class Pagination<T> implements PageInfo<T> {
  protected _items: T[];
  protected _totalCount: number;
  protected _size: number;

  get items() {
    return this._items;
  }
  get totalCount() {
    return this._totalCount;
  }
  get size() {
    return this._size;
  }

  protected constructor(
    props: Pick<PageInfo<T>, 'items' | 'totalCount' | 'size'>,
  ) {
    this._items = props.items;
    this._totalCount = props.totalCount;
    this._size = props.size;
  }
}
