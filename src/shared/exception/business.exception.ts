import { HttpException } from "@nestjs/common";
import { ErrorResponse } from "../types/types";

export class BusinessException extends HttpException {
  readonly errorCode: ErrorResponse;

  constructor(errorCode: ErrorResponse, message?: string) {
    super(message ?? errorCode.message, errorCode.httpStatus);
    this.errorCode = {
      code: errorCode.code,
      message: message ?? errorCode.message,
      httpStatus: errorCode.httpStatus,
    };
  }
}
