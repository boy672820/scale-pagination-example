import { Type } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';

export const controllers: Type<any>[] = [OrderController];
