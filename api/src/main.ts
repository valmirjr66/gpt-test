import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api').useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('GPT API Example')
    .setDescription('This is a GPT API based on NestJS')
    .setVersion('1.0')
    .addTag('GPT')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerDarkTheme = new SwaggerTheme('v3').getBuffer('dark');

  SwaggerModule.setup('ui', app, document, {
    customCss: swaggerDarkTheme,
  });

  await app.listen(4000);
}

bootstrap();
