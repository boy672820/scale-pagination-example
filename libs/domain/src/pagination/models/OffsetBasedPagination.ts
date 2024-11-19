import { PageInfo, Pagination } from './interfaces';

interface Props<T> extends PageInfo<T> {
  fixedTotalCount: number;
  currentPageNumber: number;
}

export class OffsetBasedPagination<T>
  extends Pagination<T>
  implements Props<T>
{
  static readonly MAX_TOTAL_COUNT = 10_000;

  private _fixedTotalCount: number;
  private _currentPageNumber: number;

  get fixedTotalCount() {
    return this._fixedTotalCount;
  }
  get currentPageNumber() {
    return this._currentPageNumber;
  }

  protected constructor(props: Props<T>) {
    super({
      items: props.items,
      size: props.size,
      totalCount: props.totalCount,
    });
    this._fixedTotalCount = props.fixedTotalCount;
    this._currentPageNumber = props.currentPageNumber;
  }

  static from<T>(
    props: Pick<Props<T>, 'items' | 'totalCount' | 'currentPageNumber'>,
  ): OffsetBasedPagination<T> {
    return new OffsetBasedPagination({
      ...props,
      size: props.items.length,
      fixedTotalCount: OffsetBasedPagination.MAX_TOTAL_COUNT,
    });
  }
}
