import { HttpStatus } from "@nestjs/common";

export type Code =
  | "invalid_parameter"
  | "not_found"
  | "unauthorized"
  | "general_error"
  | "internal_error"
  | "unknown_error";

export interface IErrorCode {
  code: Code;
  message: (...param: string[]) => {};
  httpStatus: HttpStatus;
}
