import { HttpStatus } from "@nestjs/common";
import { BEARER } from "../constant";
import { IErrorCode } from "./error-code";

export const ErrorCode = {
  INVALID_PARAMETER: {
    code: "invalid_parameter",
    message: (param: string) => `Invalid parameter: ${param}`,
    httpStatus: HttpStatus.BAD_REQUEST,
  } as IErrorCode,

  INVALID_USER_INACTIVE: {
    code: "invalid_parameter",
    message: (param: string) => `"${param}" is inactive.`,
    httpStatus: HttpStatus.BAD_REQUEST,
  } as IErrorCode,

  NOT_FOUND: {
    code: "not_found",
    message: (resource: string, id: string) =>
      `${resource} with ID '${id}' not found.`,
    httpStatus: HttpStatus.NOT_FOUND,
  } as IErrorCode,

  INVALID_ACCESS_TOKEN: {
    code: "unauthorized",
    message: (message: string) => message ?? "Invalid Access token",
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as IErrorCode,

  INVALID_BEARER_START_WITH: {
    code: "unauthorized",
    message: () => `Authorization header must start with "${BEARER}"`,
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as IErrorCode,

  INVALID_REFRESH_TOKEN: {
    code: "unauthorized",
    message: (message: string) => message ?? "Invalid Refresh token",
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as IErrorCode,

  INTERNAL_SERVER_ERROR: {
    code: "internal_error",
    message: () => "An unexpected error occurred. Please try again later.",
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  } as IErrorCode,
} as const;
