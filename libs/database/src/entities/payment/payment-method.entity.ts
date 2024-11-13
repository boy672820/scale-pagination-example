import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'payment_methods' })
export class PaymentMethodEntity {
  @PrimaryKey({ name: 'payment_method_id', type: 'int', unsigned: true })
  id: number;

  @Property({
    name: 'payment_method_name',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Property({
    name: 'payment_method_type',
    type: 'varchar',
    length: 45,
  })
  type: string;
}
