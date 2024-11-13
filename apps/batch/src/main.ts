import { NestFactory } from '@nestjs/core';
import { BatchModule } from './batch.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(BatchModule);
}
bootstrap();
