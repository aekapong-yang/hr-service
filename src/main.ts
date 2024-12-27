import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./core/filters/global-exception.filter";
import { DefaultPostStatusInterceptor } from "./core/interceptors/default-post-status.interceptor";
import { AuthGuard } from "./core/guards/auth.guard";

console.log(new Date());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(new GlobalExceptionFilter());
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
