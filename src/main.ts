import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';
import { ResolvePromisesInterceptor } from '@common/interceptors/serializer.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
        new ResolvePromisesInterceptor(),
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    const configDocument = new DocumentBuilder()
        .setTitle('Telegram Bot')
        .setDescription('Swagger Telegram Bot')
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('http://localhost:3000')
        .build();
    const document = SwaggerModule.createDocument(app, configDocument);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
