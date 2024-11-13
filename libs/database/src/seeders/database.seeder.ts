import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { OrderSeeder } from './order.seeder';
import { PaymentMethodSeeder } from './payment-method.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [OrderSeeder, PaymentMethodSeeder]);
  }
}
