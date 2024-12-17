import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../domain/order/services';
// import { OrderDetail } from '../../../domain/order/models';

@Injectable()
export class FindMyOrderDetailUseCase {
  constructor(private readonly orderService: OrderService) {}

  // async execute({ id }: { id: string }): Promise<OrderDetail> {
  //   const orderDetail = await this.orderService.findDetailById(id);
  //   return orderDetail;
  // }
}
