import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "../constants/error-code";

export class BusinessException extends HttpException {
  readonly code: string;
  readonly httpStatus: HttpStatus;
  constructor({ code, message, httpStatus }: ErrorCode, ...params: string[]) {
    super(message(...params), httpStatus);

    this.code = code;
    this.httpStatus = httpStatus;
  }
}
