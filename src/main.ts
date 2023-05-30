import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {doc} from "prettier";
import join = doc.builders.join;


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //console.log('__dirname', __dirname)
  app.useStaticAssets(join(__dirname, '..', 'public'),
      {prefix: '/public'});
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  })
  await app.listen(3000);
}
bootstrap();
