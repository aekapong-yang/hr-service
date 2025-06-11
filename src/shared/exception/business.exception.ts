import { HttpException, HttpStatus } from "@nestjs/common";
import { Code, IErrorCode } from "../constants/error-code/error-code.d";

export class BusinessException extends HttpException {
  readonly code: Code;
  readonly httpStatus: HttpStatus;

  constructor({ code, message, httpStatus }: IErrorCode, ...params: string[]) {
    super(message(...params), httpStatus);

    this.code = code;
    this.httpStatus = httpStatus;
  }
  
}
