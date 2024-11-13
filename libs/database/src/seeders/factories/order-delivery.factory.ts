import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { ulid } from 'ulid';
import { generateDeliveryNumber } from '../../utils/generateDeliveryNumber';
import { OrderDeliveryEntity } from '../../entities/order';

export interface DeliveryHistory {
  deliveryNumber: string;
  placeName: string;
  placePhone: string;
  status: string;
  date: string;
}

export class OrderDeliveryFactory extends Factory<OrderDeliveryEntity> {
  model = OrderDeliveryEntity;

  definition(): OrderDeliveryEntity {
    return {
      id: ulid(),
      deliveryNumber: faker.string.alphanumeric(12),
      deliveryStatus: faker.helpers.arrayElement(statuses),
      deliveryHistories: generateHistories(),
      deliveryStoreName: faker.company.name(),
      deliveryStoreCode: faker.string.alphanumeric(8),
      receiverRealname: faker.person.fullName(),
      receiverPhone: faker.phone.number({ style: 'human' }),
      address: faker.address.streetAddress(),
      addressDetail: faker.address.secondaryAddress(),
      zipCode: faker.address.zipCode(),
      requestMessage: faker.lorem.sentence(),
    };
  }
}

const statuses = ['STARTED', 'SHIPPING', 'COMPLETED'] as const;

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
