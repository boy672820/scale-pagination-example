import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { OrderEntity } from '@libs/database/entities/order';
import { LoggerModule } from '@libs/logger';
import { OrderScheduler } from './order.scheduler';
import { OrderService } from './order.service';
import { OrderRepositoryImpl } from './order.repository.impl';
import { OrderController } from './order.controller';
import {
  OrderDeliveryEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from './entities';

@Module({
  imports: [
    DatabaseModule.forFeature([
      OrderEntity,
      OrderProductEntity,
      OrderDeliveryEntity,
      OrderPaymentEntity,
    ]),
    LoggerModule.forRoot({ appName: 'Batch', environment: 'development' }),
  ],
  controllers: [OrderController],
  providers: [
    OrderScheduler,
    OrderService,
    { provide: 'ORDER_REPOSITORY', useClass: OrderRepositoryImpl },
  ],
})
export class OrderModule {}
