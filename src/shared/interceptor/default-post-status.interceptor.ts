import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request, Response } from "express";

@Injectable()
export class DefaultPostStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (
      request.method === "POST" &&
      response.statusCode === HttpStatus.CREATED
    ) {
      response.status(HttpStatus.OK);
    }

    return next.handle();
  }
}
