/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  let isCertLoaded = false
  let key: any;
  let cert: any;
  try {

    const sslFiles = await Promise.all([
      await fs.readFile(process.env.KEY_PATH),
      await fs.readFile(process.env.CERT_PATH),
    ]);

    key = sslFiles[0];
    cert = sslFiles[1];

    isCertLoaded = true
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Error reading certificate files. Starting as http server');
    }
  }

  const config = new DocumentBuilder()
    .setTitle('NestJS Backend API')
    .setDescription('The NestJS Backend API description')
    .setVersion('1.0')
    .addTag('ibroid')
    .build();


  const app = await NestFactory.create(AppModule, isCertLoaded ? {
    httpsOptions: {
      key: key,
      cert: cert
    }
  } : {});

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
