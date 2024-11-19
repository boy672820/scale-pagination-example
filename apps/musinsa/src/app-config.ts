import {
  ClassSerializerInterceptorOptions,
  ValidationPipeOptions,
} from '@nestjs/common';

interface SwaggerOptions {
  title?: string;
  description?: string;
  version?: string;
  tag?: string;
}

/**
 * Default Port:
 */
export const port = Number(process.env.PORT) || 3000;

/**
 * ValidationPipe Options:
 */
export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
};

/**
 * ClassSerializerInterceptor Options:
 */
export const classSerializerOptions: ClassSerializerInterceptorOptions = {
  excludeExtraneousValues: true,
};

/**
 * Global Prefix:
 */
export const prefix: string = 'api';

/**
 * Swagger Options:
 */
export const swaggerOptions: SwaggerOptions = {
  title: 'Scale Pagination Example API',
  description: '',
  version: '1.0',
};
