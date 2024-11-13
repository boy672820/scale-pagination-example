import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'order_products' })
export class OrderProductEntity {
  @PrimaryKey({ name: 'order_product_id', type: 'char', length: 26 })
  id: string;

  @Property({ name: 'store_name', type: 'varchar', length: 45 })
  storeName: string;

  @Property({ name: 'store_code', type: 'varchar', length: 100 })
  storeCode: string;

  @Property({ name: 'product_number', type: 'char', length: 7 })
  productNumber: string;

  @Property({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string;

  @Property({ name: 'product_summary', type: 'text', nullable: true })
  productSummary?: string;

  @Property({ name: 'product_thumbnail', type: 'text' })
  productThumbnail: string;

  @Property({
    name: 'product_origin_price',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
  })
  productOriginPrice: string;

  @Property({
    name: 'product_total_price',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
  })
  productTotalPrice: string;

  @Property({
    name: 'product_discount_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    unsigned: true,
    default: '0.00',
  })
  productDiscountRate: string;

  @Property({
    name: 'product_discount_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    unsigned: true,
    default: '0.00',
  })
  productDiscountAmount: string;

  @Property({ name: 'product_sizes', type: 'json' })
  productSizes: object;

  @Property({ name: 'product_options', type: 'json', nullable: true })
  productOptions?: object;
}
