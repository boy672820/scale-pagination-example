import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'orders' })
export class OrderEntity {
  @PrimaryKey({ name: 'order_id', type: 'char', length: 26 })
  id: string;

  @Property({ name: 'product_id', type: 'char', length: 26 })
  productId: string;

  @Property({ name: 'user_id', type: 'char', length: 26 })
  userId: string;

  @Property({ name: 'order_product_id', type: 'char', length: 26 })
  orderProductId: string;

  @Property({ name: 'order_payment_id', type: 'char', length: 26 })
  orderPaymentId: string;

  @Property({ name: 'order_delivery_id', type: 'char', length: 26 })
  orderDeliveryId: string;

  @Property({ name: 'order_number', type: 'char', length: 12, unique: true })
  orderNumber: string;

  @Enum({
    name: 'order_status',
    items: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @Property({ name: 'order_quantity', type: 'int', unsigned: true })
  quantity: number;

  @Property({
    name: 'order_total_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
  })
  totalAmount: string;

  @Property({
    name: 'order_origin_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
  })
  originAmount: string;

  @Property({
    name: 'order_discount_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  discountRate?: string;

  @Property({
    name: 'order_discount_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  discountAmount?: string;

  @Property({
    name: 'created_date',
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Property({ name: 'approved_date', type: 'datetime', nullable: true })
  approvedDate?: Date;

  @Property({ name: 'rejected_date', type: 'datetime', nullable: true })
  rejectedDate?: Date;
}
