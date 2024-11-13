import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Logger } from 'winston';

@Injectable()
export class LoggerServiceImpl implements LoggerService {
  constructor(@Inject('WINSTON_LOGGER') private readonly logger: Logger) {}

  error(
    message: string,
    serviceName?: string,
    errorOrMeta?: Error | Record<string, any>,
  ): void {
    let data: Error | Record<string, any>;

    if (errorOrMeta instanceof Error) {
      data = {
        name: errorOrMeta.name,
        message: errorOrMeta.message,
        stack: errorOrMeta.stack,
      };
    } else {
      data = errorOrMeta || {};
    }

    this.logger.error(message, { ...data, serviceName });
  }

  warn(
    message: string,
    serviceName?: string,
    data?: Record<string, any>,
  ): void {
    this.logger.warn(message, { data, serviceName });
  }

  http(
    message: string,
    serviceName?: string,
    data?: Record<string, any>,
  ): void {
    this.logger.http(message, { data, serviceName });
  }

  info(
    message: string,
    serviceName?: string,
    data?: Record<string, any>,
  ): void {
    this.logger.info(message, { data, serviceName });
  }

  debug(message: string, serviceName?: string): void {
    this.logger.debug(message, { serviceName });
  }
}
