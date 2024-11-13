import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@libs/database';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule.forRoot(), OrderModule],
})
export class BatchModule {}
