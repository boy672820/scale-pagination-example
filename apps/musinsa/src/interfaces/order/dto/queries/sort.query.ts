import { IsEnum, IsOptional } from 'class-validator';
import { OrderBy, Sort } from '../../../../domain/order/types';

export class SortQuery {
  @IsEnum(Sort)
  @IsOptional()
  readonly sort: Sort = Sort.CreatedDate;

  @IsEnum(OrderBy)
  @IsOptional()
  readonly orderBy: OrderBy = OrderBy.Asc;
}
