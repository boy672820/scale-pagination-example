import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PaginationQuery {
  @IsString()
  @IsNotEmpty()
  readonly cursor: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  readonly limit: number;
}
