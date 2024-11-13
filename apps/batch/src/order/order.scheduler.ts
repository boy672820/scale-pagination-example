import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '@libs/logger';
import { InjectLogger } from '@libs/logger/decorators';
import { OrderService } from './order.service';

@Injectable()
export class OrderScheduler {
  constructor(
    private readonly orderService: OrderService,
    @InjectLogger() private readonly logger: LoggerService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleBulkCreation() {
    const batchSize = 1_000;
    const start = Date.now();
    await this.orderService.bulkCreate(batchSize);
    const end = Date.now();
    const duration = end - start;
    this.logger.info(
      `배치 프로세싱 완료: ${batchSize}개의 주문내역이 생성되었습니다. (${duration}ms)`,
      'OrderScheduler',
      {
        batchSize,
        duration,
      },
    );
  }
}
