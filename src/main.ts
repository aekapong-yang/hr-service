import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AxiosExceptionFilter } from "./shared/filter/axios-exception.filter";
import { HttpExceptionFilter } from "./shared/filter/http-exception.filter";
import { DefaultPostStatusInterceptor } from "./shared/interceptor/default-post-status.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });

  app.useGlobalFilters(new HttpExceptionFilter(), new AxiosExceptionFilter());
  app.useGlobalInterceptors(new DefaultPostStatusInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  // app.useLogger(new WinstonLoggerService());

  app.setGlobalPrefix(process.env.APP_CONTEXT_PATH);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
