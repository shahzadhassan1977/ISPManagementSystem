import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Added import for SwaggerModule and DocumentBuilder
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalInterceptors(app.get(LoggingInterceptor));

  app.enableCors({
    origin: "http://localhost:3000", // your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

   const config = new DocumentBuilder()
    .setTitle('ISP Management System API')
    .setDescription('API documentation for the ISP Management System')
    .setVersion('1.0')
    .addBearerAuth({ 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token', )// This name must match the decorator later)
    //.addTag('users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);


  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
