/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {

  let isCertLoaded = false
  let key: any;
  let cert: any;
  try {

    const sslFiles = await Promise.all([
      await fs.readFile('./key.pem'),
      await fs.readFile('./cert.pem'),
    ]);

    key = sslFiles[0];
    cert = sslFiles[1];

    isCertLoaded = true
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Error reading certificate files. Starting as http server');
    }
  }

  const app = await NestFactory.create(AppModule, isCertLoaded ? {
    httpsOptions: {
      key: key,
      cert: cert
    }
  } : {});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
