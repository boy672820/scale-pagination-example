import { DeliveryHistory } from '@libs/domain/order/models';
import { DeliveryStatus } from '@libs/domain/order/types';
import { generateDeliveryNumber } from '@libs/domain/order/utils';
import { OrderDeliveryEntity as Entity } from '@libs/database/entities/order';
import { faker } from '@faker-js/faker';
import { ulid } from 'ulid';

export class OrderDeliveryEntity extends Entity {
  private constructor() {
    super();
  }

  static from = (
    props: Pick<
      OrderDeliveryEntity,
      | 'id'
      | 'deliveryNumber'
      | 'deliveryStatus'
      | 'deliveryHistories'
      | 'deliveryStoreName'
      | 'deliveryStoreCode'
      | 'receiverRealname'
      | 'receiverPhone'
      | 'address'
      | 'addressDetail'
      | 'zipCode'
      | 'requestMessage'
    >,
  ): OrderDeliveryEntity => Object.assign(new OrderDeliveryEntity(), props);

  static createFake(): OrderDeliveryEntity {
    return OrderDeliveryEntity.from({
      id: ulid(),
      deliveryNumber: faker.string.alphanumeric(12),
      deliveryStatus: faker.helpers.enumValue(DeliveryStatus),
      deliveryHistories: generateHistories(),
      deliveryStoreName: faker.company.name(),
      deliveryStoreCode: faker.string.alphanumeric(8),
      receiverRealname: faker.person.fullName(),
      receiverPhone: faker.phone.number({ style: 'human' }),
      address: faker.location.streetAddress(),
      addressDetail: faker.location.secondaryAddress(),
      zipCode: faker.location.zipCode(),
      requestMessage: faker.lorem.sentence(),
    });
  }
}

const generateHistories = (): DeliveryHistory[] =>
  new Array({ length: Math.floor(Math.random() * 10) }).fill(null).map(() => ({
    deliveryNumber: generateDeliveryNumber(),
    date: new Date().toISOString(),
    placeName: faker.helpers.arrayElement(deliveryPlaces),
    placePhone: faker.phone.number({ style: 'human' }),
    status: faker.helpers.arrayElement(deliveryStatuses),
  }));

const deliveryStatuses = [
  '집화처리',
  '행낭포장',
  'SM입고',
  '입고',
  '분류',
  '간선하차',
  '간선상차',
  '배송상차',
  '배송출발',
  '배송완료',
];

const deliveryPlaces = [
  '서울마포숭문',
  '마포B',
  '마포BMP',
  '대전HUB',
  '광주서',
  '광주서구풍암',
];
