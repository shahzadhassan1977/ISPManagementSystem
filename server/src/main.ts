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
    origin: true,
    credentials: true,
  });

  // ✅ Swagger
  const config = new DocumentBuilder()
    .setTitle('ISP Management System API')
    .setDescription('API documentation for ISP Management System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 5000);

  console.log(`🚀 Server running on http://localhost:5000`);
  console.log(`📄 Swagger running on http://localhost:5000/swagger`);
}
bootstrap();
