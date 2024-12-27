import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException
} from "@nestjs/common";
import { Request, Response } from "express";
import { Code } from "../constants/error-code";
import { BusinessException } from "../exceptions/business.exception";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      return response.status(exception.getStatus()).json({
        code: "invalid_parameter",
        message: (exception.getResponse() as GlobalErrMessage).message[0],
      } as ApiResponse);
    }

    if (exception instanceof NotFoundException) {
      return response.status(exception.getStatus()).json({
        code: "not_found",
        message: (exception.getResponse() as GlobalErrMessage).message,
      } as ApiResponse);
    }

    // Custom Exception
    if (exception instanceof BusinessException) {
      return response.status(exception.httpStatus).json({
        code: exception.code,
        message: exception.message,
      } as ApiResponse);
    }

    // Default Error Message
    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        code: "general_error",
        message: exception.message,
      } as ApiResponse);
    }
  }
}

export interface ApiResponse {
  code: Code;
  message: string;
}

interface GlobalErrMessage {
  message: string | string[];
  error: string;
  statusCode: number;
}
