import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginationQuery {
  @ApiProperty({ description: '한 페이지의 최대 아이템 수' })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  readonly limit: number;
}

export class OffsetBasedPaginationQuery extends PaginationQuery {
  @ApiProperty({ description: '페이지 번호', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  readonly pageNumber?: number;
}

export class CursorBasedPaginationQuery extends PaginationQuery {
  @ApiProperty({
    description: '커서는 기본적으로 엔티티의 ID에 해당합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly cursor?: string;
}
