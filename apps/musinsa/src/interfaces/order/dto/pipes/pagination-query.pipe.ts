import {
  BadRequestException,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CursorBasedPaginationQuery,
  OffsetBasedPaginationQuery,
  PaginationQuery,
} from '../queries';
import { validate } from 'class-validator';

export class PaginationQueryPipe implements PipeTransform {
  async transform(value: unknown) {
    if (typeof value !== 'object') {
      throw new BadRequestException('페이징 쿼리 요청이 잘못되었습니다.');
    }

    let dto: CursorBasedPaginationQuery | OffsetBasedPaginationQuery;

    if ('cursor' in value) {
      dto = plainToInstance(CursorBasedPaginationQuery, value);
    }
    if ('pageNumber' in value) {
      dto = plainToInstance(OffsetBasedPaginationQuery, value);
    }
    if (!dto) {
      dto = plainToInstance(PaginationQuery, value);
    }

    const validation = await validate(dto);

    if (validation.length > 0) {
      const exceptionFactory = new ValidationPipe().createExceptionFactory();
      throw exceptionFactory(validation);
    }

    return dto;
  }
}
