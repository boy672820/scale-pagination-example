import { DynamicModule, Module } from '@nestjs/common';
import { createLogger } from './utils/createLogger';
import { LoggerModuleOptions } from './logger.interface';
import { LOGGER } from './logger.token';
import { LoggerServiceImpl } from './logger.service.impl';

@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    const { appName, environment } = options;

    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'WINSTON_LOGGER',
          useValue: createLogger({ appName, environment }),
        },
        {
          provide: LOGGER,
          useClass: LoggerServiceImpl,
        },
      ],
      exports: [LOGGER],
    };
  }
}
