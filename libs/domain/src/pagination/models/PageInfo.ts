export interface PageInfo<T> {
  items: T[];
  totalCount: number;
  size: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export class Pagination<T> implements PageInfo<T> {
  private _items: T[];
  private _totalCount: number;
  private _size: number;
  private _hasPrevPage: boolean;
  private _hasNextPage: boolean;

  get items() {
    return this._items;
  }
  get totalCount() {
    return this._totalCount;
  }
  get size() {
    return this._size;
  }
  get hasPrevPage() {
    return this._hasPrevPage;
  }
  get hasNextPage() {
    return this._hasNextPage;
  }

  private constructor(
    props: Pick<
      PageInfo<T>,
      'items' | 'totalCount' | 'size' | 'hasNextPage' | 'hasPrevPage'
    >,
  ) {
    this._items = props.items;
    this._totalCount = props.totalCount;
    this._size = props.size;
    this._hasPrevPage = props.hasPrevPage;
    this._hasNextPage = props.hasNextPage;
  }

  static from<T>(
    props: Pick<PageInfo<T>, 'items' | 'totalCount'> & {
      limit: number;
      cursor?: string;
    },
  ): Pagination<T> {
    let hasNextPage = false;

    if (props.items.length > props.limit) {
      hasNextPage = true;
      props.items.pop();
    }

    return new Pagination({
      items: props.items,
      size: props.items.length,
      totalCount: props.totalCount,
      hasNextPage,
      hasPrevPage: !!props?.cursor && props.items.length !== 0,
    });
  }
}
