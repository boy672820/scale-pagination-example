import { Migration } from '@mikro-orm/migrations';

export class Migration20241217154225 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`order_deliveries\` (\`order_delivery_id\` char(26) not null, \`delivery_number\` char(12) not null, \`delivery_status\` enum('STARTED', 'SHIPPING', 'COMPLETED') not null default 'STARTED', \`delivery_histories\` json null, \`delivery_store_name\` varchar(255) not null, \`delicery_store_code\` varchar(100) not null, \`receiver_realname\` varchar(255) not null, \`receiver_phone\` varchar(100) null, \`address\` varchar(255) not null, \`address_detail\` text null, \`zip_code\` varchar(10) null, \`request_message\` text null, primary key (\`order_delivery_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`order_payments\` (\`order_payment_id\` char(26) not null, \`payment_status\` enum('PENDING', 'COMPLETED', 'FAILED') not null default 'PENDING', \`payment_method_id\` int not null, \`payment_origin_amount\` numeric(14,2) not null, \`payment_total_amount\` numeric(14,2) not null, \`payment_discount_amount\` numeric(14,2) null, \`payment_discount_rate\` numeric(5,2) null, \`payment_saving_points\` numeric(14,2) null, \`is_saving_points_used\` tinyint(1) not null default false, \`paid_date\` datetime not null, primary key (\`order_payment_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`order_products\` (\`order_product_id\` char(26) not null, \`store_name\` varchar(45) not null, \`store_code\` varchar(100) not null, \`product_number\` char(7) not null, \`product_name\` varchar(255) not null, \`product_summary\` text null, \`product_thumbnail\` text not null, \`product_origin_price\` numeric(14,2) not null, \`product_total_price\` numeric(14,2) not null, \`product_discount_rate\` numeric(5,2) not null default '0.00', \`product_discount_amount\` numeric(14,2) not null default '0.00', \`product_sizes\` json not null, \`product_options\` json null, primary key (\`order_product_id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`orders\` (\`order_id\` char(26) not null, \`product_id\` char(26) not null, \`user_id\` char(26) not null, \`order_number\` char(12) not null, \`order_status\` enum('PENDING', 'APPROVED', 'REJECTED') not null default 'PENDING', \`order_quantity\` int unsigned not null, \`order_total_amount\` numeric(14,2) not null, \`order_origin_amount\` numeric(14,2) not null, \`order_discount_rate\` numeric(5,2) null, \`order_discount_amount\` numeric(14,2) null, \`created_date\` datetime not null default CURRENT_TIMESTAMP, \`approved_date\` datetime null, \`rejected_date\` datetime null, \`approved_date_not_null\` varchar(255) generated always as (IF(approved_date IS NOT NULL, approved_date, NULL)) STORED, \`rejected_date_not_null\` varchar(255) generated always as (IF(rejected_date IS NOT NULL, rejected_date, NULL)) STORED, \`order_product_id\` char(26) not null, \`order_payment_id\` char(26) not null, \`order_delivery_id\` char(26) not null, primary key (\`order_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`orders\` add unique \`orders_order_number_unique\`(\`order_number\`);`);
    this.addSql(`alter table \`orders\` add unique \`orders_order_product_id_unique\`(\`order_product_id\`);`);
    this.addSql(`alter table \`orders\` add unique \`orders_order_payment_id_unique\`(\`order_payment_id\`);`);
    this.addSql(`alter table \`orders\` add unique \`orders_order_delivery_id_unique\`(\`order_delivery_id\`);`);
    this.addSql(`alter table \`orders\` add index \`idx_orders_total_amount_order_id\`(\`order_total_amount\`, \`order_id\`);`);
    this.addSql(`alter table \`orders\` add index \`idx_orders_rejected_date_order_id\`(\`rejected_date_not_null\`, \`order_id\`);`);
    this.addSql(`alter table \`orders\` add index \`idx_orders_approved_date_order_id\`(\`approved_date_not_null\`, \`order_id\`);`);
    this.addSql(`alter table \`orders\` add index \`idx_orders_order_status\`(\`order_status\`);`);
    this.addSql(`alter table \`orders\` add index \`idx_orders_user_id_order_status\`(\`user_id\`, \`order_status\`);`);

    this.addSql(`create table \`payment_methods\` (\`payment_method_id\` int unsigned not null auto_increment primary key, \`payment_method_name\` varchar(100) not null, \`payment_method_type\` varchar(45) not null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`order_deliveries\`;`);

    this.addSql(`drop table if exists \`order_payments\`;`);

    this.addSql(`drop table if exists \`order_products\`;`);

    this.addSql(`drop table if exists \`orders\`;`);

    this.addSql(`drop table if exists \`payment_methods\`;`);
  }

}
