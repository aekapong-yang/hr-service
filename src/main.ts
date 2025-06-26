import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { AppModule } from "./app.module";
import { AxiosExceptionFilter } from "./shared/filter/axios-exception.filter";
import { HttpExceptionFilter } from "./shared/filter/http-exception.filter";
import { DefaultPostStatusInterceptor } from "./shared/interceptor/default-post-status.interceptor";
import { TransformDateInterceptor } from "./shared/interceptor/transform-date.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.APP_CONTEXT_PATH);
  app.enableCors({ origin: "*" });

  app.useGlobalFilters(new HttpExceptionFilter(), new AxiosExceptionFilter());
  app.useGlobalInterceptors(new DefaultPostStatusInterceptor(), new TransformDateInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  // app.useLogger(new WinstonLoggerService());


  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.tz.setDefault(process.env.TZ);

  
  await app.listen(process.env.APP_PORT);
}
bootstrap();
