import { Module } from '@nestjs/common';
import { DatabaseModule } from '@libs/database';
import { PaymentMethodEntity } from '@libs/database/entities/payment';

@Module({
  imports: [DatabaseModule.forFeature([PaymentMethodEntity])],
})
export class PaymentModule {}
