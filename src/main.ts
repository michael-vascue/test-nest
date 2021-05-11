import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // const keyFile = fs.readFileSync(path.join(__dirname, '../localhost.key'));
  // const certFile = fs.readFileSync(path.join(__dirname, '../localhost.crt'));
  // {
  //   httpsOptions: {
  //     key: keyFile,
  //     cert: certFile,
  //   },
  // }
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('https://test.vascue.io')
    // .addServer('https://localhost:3000/')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(3000);
}
bootstrap();
