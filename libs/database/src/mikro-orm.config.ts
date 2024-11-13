import { MySqlDriver, Options } from '@mikro-orm/mysql';
import { SeedManager } from '@mikro-orm/seeder';
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
  extensions: [SeedManager],
  seeder: {
    pathTs: 'libs/database/src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
  },
};

export default config;
