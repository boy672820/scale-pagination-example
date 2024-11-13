import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PaymentMethodEntity } from '../entities/payment/payment-method.entity';

export class PaymentMethodSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.upsertMany(PaymentMethodEntity, [
      ...dataByEasyPayment,
      ...dataByCard,
      ...dataByVirtualAccount,
      ...dataByMobilePayment,
    ]);
  }
}

enum PaymentType {
  Card = 'CARD',
  EasyPayment = 'EASY_PAYMENT',
  MobilePayment = 'MOBILE_PAYMENT',
  RTP = 'RTP',
  VirtualAccount = 'VIRTUAL_ACCOUNT',
  Billing = 'BILLING',
}

const createId = () => {
  let increment = 1;

  return () => {
    const id = increment;
    increment += 1;
    return id;
  };
};
const genId = createId();

const makePaymentsByType = (
  type: PaymentType,
  name: string[],
): PaymentMethodEntity[] => name.map((name) => ({ id: genId(), name, type }));

const dataByEasyPayment: PaymentMethodEntity[] = makePaymentsByType(
  PaymentType.EasyPayment,
  [
    '무신사페이',
    '토스페이',
    '카카오페이',
    '페이코',
    '애플페이',
    '삼성페이',
    '네이버페이',
    'KBPay',
  ],
);

const dataByCard: PaymentMethodEntity[] = makePaymentsByType(PaymentType.Card, [
  'KB카드',
  '신한카드',
  '현대카드',
  '삼성카드',
  '농협카드',
  '카카오뱅크',
  'BC카드',
  '하나카드',
  '우리카드',
  '롯데카드',
  '씨티카드',
]);

const dataByVirtualAccount: PaymentMethodEntity[] = makePaymentsByType(
  PaymentType.VirtualAccount,
  [
    '기업은행',
    '국민은행',
    '우리은행',
    '수협은행',
    'NH농협은행',
    '부산은행',
    '신한은행',
  ],
);

const dataByMobilePayment: PaymentMethodEntity[] = makePaymentsByType(
  PaymentType.MobilePayment,
  ['휴대폰결제'],
);
