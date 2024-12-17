import { Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from '@libs/logger';
import { InjectLogger } from '@libs/logger/decorators';
import { OrderService } from './order.service';

@Injectable()
export class OrderScheduler implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @InjectLogger() private readonly logger: LoggerService,
  ) {}

  private isShuttingDown = false;
  private activeBatchPromise: Promise<void> | null = null;

  async onModuleInit() {
    this.handleBatch();

    const shutdown = async () => {
      this.logger.info('Graceful shutdown initiated..', 'OrderScheduler');
      this.isShuttingDown = true;

      if (this.activeBatchPromise) {
        this.logger.info(
          'Waiting for the current batch to complete..',
          'OrderScheduler',
        );
        await this.activeBatchPromise;
      }

      this.logger.info('Shutdown complete. Exiting..', 'OrderScheduler');
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }

  private handleBatch() {
    const batchSize = 1000;
    const interval = 1000;
    let baseDelay = 1000;

    const processBatch = async (retry = 0) => {
      if (this.isShuttingDown) {
        this.logger.info(
          'Batch processing stopped due to shutdown.',
          'OrderScheduler',
        );
        return;
      }

      const start = Date.now();

      this.activeBatchPromise = this.orderService.bulkCreate(batchSize);
      await this.activeBatchPromise; // 배치 작업 완료 대기
      this.activeBatchPromise = null; // 작업 완료 후 해제

      const duration = Date.now() - start;

      this.logger.info(
        `배치 프로세싱 완료: ${batchSize}개의 주문내역이 생성되었습니다. (${duration}ms)`,
        'OrderScheduler',
        {
          batchSize,
          duration,
        },
      );

      if (duration > baseDelay) {
        baseDelay = duration;
        const delay = baseDelay * 2 ** retry;

        this.logger.warn(`지연 후 재시도: ${delay}ms`, 'OrderScheduler');

        setTimeout(() => processBatch(retry + 1), delay);
        return;
      }

      setTimeout(processBatch, interval);
    };

    processBatch();
  }
}
