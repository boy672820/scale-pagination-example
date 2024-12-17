import { Pagination, PageInfo } from './interfaces';

interface Props<T> extends PageInfo<T> {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export class CursorBasedPagination<T>
  extends Pagination<T>
  implements Props<T>
{
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

  static from<T>(
    props: Pick<
      Props<T>,
      | 'items'
      | 'totalCount'
      | 'hasPrevPage'
      | 'hasNextPage'
      | 'startCursor'
      | 'endCursor'
    >,
  ): CursorBasedPagination<T> {
    return new CursorBasedPagination({
      items: props.items,
      size: props.items.length,
      totalCount: props.totalCount,
      hasNextPage: props.hasNextPage,
      hasPrevPage: props.hasPrevPage,
      startCursor: props.startCursor,
      endCursor: props.endCursor,
    });
  }
}
