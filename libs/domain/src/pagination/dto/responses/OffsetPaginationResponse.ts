import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

interface Props {
  items: unknown[];
  size: number;
  totalCount: number;
  fixedTotalCount: number;
  currentPageNumber: number;
}

export class OffsetPaginationResponse implements Props {
  @Exclude()
  private _items: unknown[];
  @Exclude()
  private _size: number;
  @Exclude()
  private _totalCount: number;
  @Exclude()
  private _fixedTotalCount: number;
  @Exclude()
  private _currentPageNumber: number;

  @ApiProperty({ type: 'array' })
  @Expose()
  get items() {
    return this._items;
  }
  @ApiProperty({ type: 'number', description: '조회된 목록의 총 갯수' })
  @Expose()
  get size() {
    return this._size;
  }
  @ApiProperty({ type: 'number', description: '모든 내역의 총 갯수' })
  @Expose()
  get totalCount() {
    return this._totalCount;
  }
  @ApiProperty({ type: 'number', description: '최대 고정된 갯수' })
  @Expose()
  get fixedTotalCount() {
    return this._fixedTotalCount;
  }
  @ApiProperty({ type: 'number', description: '현재 페이지번호' })
  @Expose()
  get currentPageNumber() {
    return this._currentPageNumber;
  }

  constructor(props: Props) {
    this._items = props.items;
    this._size = props.size;
    this._totalCount = props.totalCount;
    this._fixedTotalCount = props.fixedTotalCount;
    this._currentPageNumber = props.currentPageNumber;
  }

  static from = (props: Props): OffsetPaginationResponse =>
    new OffsetPaginationResponse(props);

  reduceItems(reducer: (...args: any[]) => any): OffsetPaginationResponse {
    this._items = this.items.map(reducer);
    return this;
  }
}
