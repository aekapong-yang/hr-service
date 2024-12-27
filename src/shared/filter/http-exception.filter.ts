import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponse, GlobalErrorMessage } from "../constants/constant";
import { BusinessException } from "../exception/business.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error: ErrorResponse = toErrorResponse(exception);
    response.status(exception.getStatus()).json(error);
  }
}

function toErrorResponse(exception: HttpException): ErrorResponse {
  if (exception instanceof BadRequestException) {
    return {
      code: "invalid_parameter",
      message: (exception.getResponse() as GlobalErrorMessage).message[0],
    };
  }

  if (exception instanceof NotFoundException) {
    return {
      code: "not_found",
      message: (exception.getResponse() as GlobalErrorMessage).message,
    };
  }

  if (exception instanceof BusinessException) {
    return {
      code: exception.code,
      message: exception.message,
    };
  }

  return { code: "general_error", message: "An unexpected error occurred" };
}
