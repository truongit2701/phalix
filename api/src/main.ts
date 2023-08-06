import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .enableVersioning({
      type: VersioningType.URI,
    })
    .setGlobalPrefix('api/');

  app.enableCors();

  await app.listen(process.env.DOMAIN_PORT, () => {
    console.log(
      'App is running ' +
        process.env.DOMAIN_HOST +
        ':' +
        process.env.DOMAIN_PORT,
    );
  });
}
bootstrap();
