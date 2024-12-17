import {
  Entity,
  Enum,
  Index,
  OneToOne,
  Opt,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { OrderProductEntity } from './order-product.entity';
import { OrderPaymentEntity } from './order-payment.entity';
import { OrderDeliveryEntity } from './order-delivery.entity';

@Index({
  name: 'idx_orders_user_id_order_status',
  properties: ['userId', 'status'],
})
@Index({
  name: 'idx_orders_order_status',
  properties: ['status'],
})
@Index({
  name: 'idx_orders_approved_date_order_id',
  properties: ['approvedDateNotNull', 'id'],
})
@Index({
  name: 'idx_orders_rejected_date_order_id',
  properties: ['rejectedDateNotNull', 'id'],
})
@Index({
  name: 'idx_orders_total_amount_order_id',
  properties: ['totalAmount', 'id'],
})
@Entity({ tableName: 'orders' })
export class OrderEntity {
  @PrimaryKey({ name: 'order_id', type: 'char', length: 26 })
  id: string;

  @Property({ name: 'product_id', type: 'char', length: 26 })
  productId: string;

  @Property({ name: 'user_id', type: 'char', length: 26 })
  userId: string;

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

  @Property<OrderEntity>({
    name: 'approved_date_not_null',
    generated: (cols) =>
      `(IF(${cols.approvedDate} IS NOT NULL, ${cols.approvedDate}, NULL)) STORED`,
  })
  approvedDateNotNull: Date & Opt;

  @Property<OrderEntity>({
    name: 'rejected_date_not_null',
    generated: (cols) =>
      `(IF(${cols.rejectedDate} IS NOT NULL, ${cols.rejectedDate}, NULL)) STORED`,
  })
  rejectedDateNotNull: Date & Opt;

  @OneToOne({ joinColumn: 'order_product_id' })
  orderProduct: OrderProductEntity;

  @OneToOne({ joinColumn: 'order_payment_id' })
  orderPayment: OrderPaymentEntity;

  @OneToOne({ joinColumn: 'order_delivery_id' })
  orderDelivery: OrderDeliveryEntity;
}
