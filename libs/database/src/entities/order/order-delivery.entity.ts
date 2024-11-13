import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'order_deliveries' })
export class OrderDeliveryEntity {
  @PrimaryKey({ name: 'order_delivery_id', type: 'char', length: 26 })
  id: string;

  @Property({ name: 'delivery_number', type: 'char', length: 12 })
  deliveryNumber: string;

  @Enum({
    name: 'delivery_status',
    items: ['STARTED', 'SHIPPING', 'COMPLETED'],
    default: 'STARTED',
  })
  deliveryStatus: 'STARTED' | 'SHIPPING' | 'COMPLETED';

  @Property({ name: 'delivery_histories', type: 'json', nullable: true })
  deliveryHistories?: object;

  @Property({ name: 'delivery_store_name', type: 'varchar', length: 255 })
  deliveryStoreName: string;

  @Property({ name: 'delicery_store_code', type: 'varchar', length: 100 })
  deliveryStoreCode: string;

  @Property({ name: 'receiver_realname', type: 'varchar', length: 255 })
  receiverRealname: string;

  @Property({
    name: 'receiver_phone',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  receiverPhone?: string;

  @Property({ name: 'address', type: 'varchar', length: 255 })
  address: string;

  @Property({ name: 'address_detail', type: 'text', nullable: true })
  addressDetail?: string;

  @Property({ name: 'zip_code', type: 'varchar', length: 10, nullable: true })
  zipCode?: string;

  @Property({ name: 'request_message', type: 'text', nullable: true })
  requestMessage?: string;
}
