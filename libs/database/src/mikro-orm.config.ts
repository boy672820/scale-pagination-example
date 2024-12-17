import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities/order';
import { PaymentMethodEntity } from './entities/payment';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const database = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_DBNAME,
};

const config: Options = {
  driver: MySqlDriver,
  host: database.host,
  port: database.port,
  user: database.username,
  password: database.password,
  dbName: database.dbName,
  entities: [
    OrderEntity,
    OrderProductEntity,
    OrderDeliveryEntity,
    OrderPaymentEntity,
    PaymentMethodEntity,
  ],
  debug: true,
  extensions: [SeedManager, Migrator],
  seeder: {
    pathTs: 'libs/database/src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
  migrations: {
    tableName: 'mikro_orm_migrations',
    pathTs: 'libs/database/src/migrations',
    disableForeignKeys: false,
  },
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: false,
  },
};

export default config;
