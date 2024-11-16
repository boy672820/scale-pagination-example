import { transformOrderStatus } from '@libs/domain/order/utils';
import { OrderEntity } from '@libs/database/entities/order';
import { OrderProductSummary } from '../../../domain/order/models';

type Entity = Pick<
  OrderEntity,
  'id' | 'orderNumber' | 'status' | 'approvedDate' | 'orderProduct'
>;

export class OrderProductSummaryMapper {
  static toModel = (entities: Entity | Entity[]) =>
    (Array.isArray(entities) ? entities : [entities]).map((entity) =>
      OrderProductSummary.from({
        id: entity.id,
        orderNumber: entity.orderNumber,
        orderStatus: transformOrderStatus(entity.status),
        storeName: entity.orderProduct.storeName,
        storeCode: entity.orderProduct.storeCode,
        productNumber: entity.orderProduct.productNumber,
        productName: entity.orderProduct.productName,
        productThumbnail: entity.orderProduct.productThumbnail,
        productSizes: entity.orderProduct.productSizes,
        productOptions: entity.orderProduct.productOptions,
        approvedDate: entity.approvedDate,
      }),
    );
}
