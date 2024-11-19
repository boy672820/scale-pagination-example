import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

interface Props {
  items: unknown[];
  totalCount: number;
  size: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export class CursorPaginationResponse implements Props {
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
  @Exclude()
  private _startCursor: string;
  @Exclude()
  private _endCursor: string;

  @ApiProperty({ type: 'array' })
  @Expose()
  get items() {
    return this._items;
  }
  @ApiProperty({ type: 'number', description: '모든 내역의 총 갯수' })
  @Expose()
  get totalCount() {
    return this._totalCount;
  }
  @ApiProperty({ type: 'number', description: '조회된 목록의 총 갯수' })
  @Expose()
  get size() {
    return this._size;
  }
  @ApiProperty({ type: 'boolean', description: '다음 페이지 존재 여부' })
  @Expose()
  get hasPrevPage() {
    return this._hasPrevPage;
  }
  @ApiProperty({ type: 'boolean', description: '이전 페이지 존재 여부' })
  @Expose()
  get hasNextPage() {
    return this._hasNextPage;
  }
  @ApiProperty({ type: 'string', description: '시작 커서' })
  @Expose()
  get startCursor() {
    return this._startCursor;
  }
  @ApiProperty({ type: 'string', description: '종료 커서' })
  @Expose()
  get endCursor() {
    return this._endCursor;
  }

  constructor(props: Props) {
    this._items = props.items;
    this._totalCount = props.totalCount;
    this._size = props.size;
    this._hasPrevPage = props.hasPrevPage;
    this._hasNextPage = props.hasNextPage;
    this._startCursor = props.startCursor;
    this._endCursor = props.endCursor;
  }

  static from = (props: Props): CursorPaginationResponse =>
    new CursorPaginationResponse(props);

  reduceItems(reducer: (...args: any[]) => any): CursorPaginationResponse {
    this._items = this._items.map(reducer);
    return this;
  }
}
