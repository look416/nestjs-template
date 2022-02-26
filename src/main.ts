import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import * as config from 'config';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Soccer Manager')
    .setDescription('The soccer manager online API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useLogger(app.get(Logger));
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.get('server.port'));
}
bootstrap();
