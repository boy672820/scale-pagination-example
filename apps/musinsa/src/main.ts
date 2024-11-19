import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  classSerializerOptions,
  port,
  prefix,
  swaggerOptions,
  validationPipeOptions,
} from './app-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(swaggerOptions?.title || '')
    .setDescription(swaggerOptions?.description || '')
    .setVersion(swaggerOptions?.version || '')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), classSerializerOptions),
  );
  app.setGlobalPrefix(prefix);
  await app.listen(port);
}
bootstrap();
