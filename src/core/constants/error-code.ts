import { HttpStatus } from "@nestjs/common";
import { BEARER } from "./constant";

export type Code =
  | "invalid_parameter"
  | "not_found"
  | "unauthorized"
  | "general_error"
  | "internal_error"
  | "unknown_error";

export type ErrorCode = {
  code: Code;
  message: (...param: string[]) => {};
  httpStatus: HttpStatus;
};

export const ErrorCodes = {
  INVALID_PARAMETER: {
    code: "invalid_parameter",
    message: (param: string) => `Invalid parameter: ${param}`,
    httpStatus: HttpStatus.BAD_REQUEST,
  } as ErrorCode,

  INVALID_USER_INACTIVE: {
    code: "invalid_parameter",
    message: (param: string) => `"${param}" is inactive.`,
    httpStatus: HttpStatus.BAD_REQUEST,
  } as ErrorCode,

  NOT_FOUND: {
    code: "not_found",
    message: (resource: string, id: string) =>
      `${resource} with ID '${id}' not found.`,
    httpStatus: HttpStatus.NOT_FOUND,
  } as ErrorCode,

  INVALID_ACCESS_TOKEN: {
    code: "unauthorized",
    message: (message: string) => message ?? "Invalid Access token",
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as ErrorCode,

  INVALID_BEARER_START_WITH: {
    code: "unauthorized",
    message: () =>  `Authorization header must start with "${BEARER}"`,
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as ErrorCode,

  INVALID_REFRESH_TOKEN: {
    code: "unauthorized",
    message: (message: string) => message ?? "Invalid Refresh token",
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as ErrorCode,

  INTERNAL_SERVER_ERROR: {
    code: "internal_error",
    message: () => "An unexpected error occurred. Please try again later.",
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  } as ErrorCode,
} as const;
