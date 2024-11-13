import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import {
  OrderDeliveryEntity,
  OrderEntity,
  OrderPaymentEntity,
  OrderProductEntity,
} from '@libs/database/entities/order';
import { controllers } from '../../interfaces/order';
import { usecases } from '../../application/order';
import { services } from '../../domain/order';
import { repositories } from '../../infra/order';

@Module({
  imports: [
    DatabaseModule.forFeature([
      OrderEntity,
      OrderProductEntity,
      OrderDeliveryEntity,
      OrderPaymentEntity,
    ]),
  ],
  controllers: [...controllers],
  providers: [...usecases, ...services, ...repositories],
})
export class OrderModule {}
