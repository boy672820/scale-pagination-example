import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationQuery {
  @IsString()
  @IsOptional()
  readonly cursor?: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  readonly limit: number;
}
