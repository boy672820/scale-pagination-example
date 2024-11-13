import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  classSerializerOptions,
  port,
  prefix,
  validationPipeOptions,
} from './app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), classSerializerOptions),
  );
  app.setGlobalPrefix(prefix);
  await app.listen(port);
}
bootstrap();
