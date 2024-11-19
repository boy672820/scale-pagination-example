import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  getSchemaPath,
  ApiResponse as SwaggerResponse,
} from '@nestjs/swagger';

export const ApiResponse = ({
  status,
  type: Type,
  description,
}: {
  status: 200 | 201 | 204 | 400 | 401 | 403 | 409 | 500;
  type: Type<unknown> | Type<unknown>[];
  description?: string;
}) => {
  const types = Array.isArray(Type) ? Type : [Type];

  return applyDecorators(
    ApiExtraModels(...types),
    SwaggerResponse({
      status,
      schema: {
        type: 'object',
        properties: {
          data: {
            description,
            oneOf: types.map((Type) => ({ $ref: getSchemaPath(Type) })),
          },
          message: { description: 'API 응답 메시지', type: 'string' },
          status: {
            description: 'API 고유 상태',
            type: 'enum',
            enum: ['OK', 'SERVER_ERROR', 'BAD_PARAMETER'],
          },
        },
      },
    }),
  );
};
