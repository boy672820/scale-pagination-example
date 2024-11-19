import { Pagination, PageInfo, Record } from './interfaces';

export class CursorBasedPagination<T> extends Pagination<T> {
  protected _hasPrevPage: boolean;
  protected _hasNextPage: boolean;
  private _startCursor: string | null;
  private _endCursor: string | null;

  get startCursor() {
    return this._startCursor;
  }
  get endCursor() {
    return this._endCursor;
  }
  get hasPrevPage() {
    return this._hasPrevPage;
  }
  get hasNextPage() {
    return this._hasNextPage;
  }

  constructor(
    props: Pick<PageInfo<T>, 'items' | 'totalCount' | 'size'> & {
      startCursor: string;
      endCursor: string;
      hasPrevPage: boolean;
      hasNextPage: boolean;
    },
  ) {
    super(props);
    this._startCursor = props.startCursor;
    this._endCursor = props.endCursor;
    this._hasPrevPage = props.hasPrevPage;
    this._hasNextPage = props.hasNextPage;
  }

  static from<T extends Record>(
    props: Pick<PageInfo<T>, 'totalCount'> & {
      items: T[];
      limit: number;
      cursor?: string;
    },
  ): CursorBasedPagination<T> {
    let hasNextPage = false;

    if (props.items.length > props.limit) {
      hasNextPage = true;
      props.items.pop();
    }

    return new CursorBasedPagination({
      items: props.items,
      size: props.items.length,
      totalCount: props.totalCount,
      hasNextPage,
      hasPrevPage: !!props?.cursor && props.items.length !== 0,
      startCursor: props.items[0]?.cursor || null,
      endCursor: props.items[props.items.length - 1]?.cursor || null,
    });
  }
}
