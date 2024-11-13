import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'order_payments' })
export class OrderPaymentEntity {
  @PrimaryKey({ name: 'order_payment_id', type: 'char', length: 26 })
  id: string;

  @Enum({
    name: 'payment_status',
    type: 'enum',
    items: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  })
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Property({ name: 'payment_method_id', type: 'int' })
  paymentMethodId: number;

  @Property({
    name: 'payment_origin_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
  })
  paymentOriginAmount: string;

  @Property({
    name: 'payment_total_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
  })
  paymentTotalAmount: string;

  @Property({
    name: 'payment_discount_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  paymentDiscountAmount?: string;

  @Property({
    name: 'payment_discount_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  paymentDiscountRate?: string;

  @Property({
    name: 'payment_saving_points',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
    nullable: true,
  })
  paymentSavingPoints?: string;

  @Property({ name: 'is_saving_points_used', type: 'boolean', default: false })
  isSavingPointsUsed: boolean;

  @Property({ name: 'paid_date', type: 'datetime' })
  paidDate: Date;
}
