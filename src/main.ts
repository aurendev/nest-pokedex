import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,

    //? trnasforma los datos pasados (params o queries) en el tipo de los DTOs 
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await app.listen(process.env.PORT);

  console.log('Running in  Port '+ process.env.PORT );
}
bootstrap();
