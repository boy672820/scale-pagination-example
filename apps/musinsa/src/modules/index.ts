import { Type } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

export const modules: Type<any>[] = [OrderModule, PaymentModule];
