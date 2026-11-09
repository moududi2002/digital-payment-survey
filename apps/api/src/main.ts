import 'reflect-metadata';
import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  const port = Number(process.env.PORT || 5180);
  const host = process.env.HOST || '127.0.0.1';

  await app.listen(port, host);

  console.log(
    `Survey API running at http://${host}:${port}/api/v1`,
  );
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to start Survey API:', error);
  process.exit(1);
});