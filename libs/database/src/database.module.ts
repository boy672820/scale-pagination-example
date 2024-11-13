import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AnyEntity, EntityName, MySqlDriver } from '@mikro-orm/mysql';
import databaseConfig from './database.config';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule.forRoot({ envFilePath: ['.env'] }),
        MikroOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            autoLoadEntities: true,
            driver: MySqlDriver,
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            user: configService.get<string>('database.username'),
            password: configService.get<string>('database.password'),
            dbName: configService.get<string>('database.dbName'),
          }),
          imports: [ConfigModule.forFeature(databaseConfig)],
        }),
      ],
    };
  }

  static forFeature(entities: EntityName<AnyEntity>[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [MikroOrmModule.forFeature(entities)],
    };
  }
}