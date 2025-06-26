import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Code, ErrorCode } from "../constants/error-code";
import { ApiResponse } from "../dto/api-response.dto";
import { BusinessException } from "../exception/business.exception";
import { GlobalErrorMessage } from "../types/types";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorMessage: ApiResponse<{}> = toApiResponse(exception);
    response.status(exception.getStatus()).json(errorMessage);
  }
}

function toApiResponse(exception: HttpException): ApiResponse<{}> {
  if (exception instanceof BadRequestException) {
    return ApiResponse.error({
      code: Code.INVALID_PARAMETER,
      message: (exception.getResponse() as GlobalErrorMessage).message[0],
      httpStatus: HttpStatus.BAD_REQUEST,
    });
  }

  if (exception instanceof NotFoundException) {
    return ApiResponse.error({
      code: Code.NOT_FOUND,
      message: (exception.getResponse() as GlobalErrorMessage).message,
      httpStatus: HttpStatus.NOT_FOUND,
    });
  }

  if (exception instanceof BusinessException) {
    return ApiResponse.error(exception.errorCode);
  }

  return ApiResponse.error(ErrorCode.GENERAL_ERROR);
}
