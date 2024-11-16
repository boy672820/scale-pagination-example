import { Type } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { UserController } from './controllers/user.controller';

export const controllers: Type<any>[] = [OrderController, UserController];
