import { HttpStatus } from "@nestjs/common";
import { ErrorResponse } from "../types/types";
import { AppConstant } from "./app-constant";

export enum Code {
  SUCCESS = 'success',
  INVALID_PARAMETER = 'invalid_parameter',
  NOT_FOUND = 'not_found',
  UNAUTHORIZED = 'unauthorized',
  GENERAL_ERROR = 'general_error',
  INTERNAL_ERROR = 'internal_error',
  UNKNOWN_ERROR = 'unknown_error',
}

export const ErrorCode = {
  NOT_FOUND: error(Code.NOT_FOUND, "Data not found", HttpStatus.NOT_FOUND),

  INVALID_PARAMETER: error(
    Code.INVALID_PARAMETER,
    "Invalid parameter",
    HttpStatus.BAD_REQUEST,
  ),

  INVALID_ACCESS_TOKEN: error(
    Code.UNAUTHORIZED,
    "Invalid Access token",
    HttpStatus.UNAUTHORIZED,
  ),

  INVALID_BEARER_START_WITH: error(
    Code.UNAUTHORIZED,
    `Authorization header must start with "${AppConstant.BEAERE}"`,
    HttpStatus.UNAUTHORIZED,
  ),

  INVALID_REFRESH_TOKEN: error(
    Code.UNAUTHORIZED,
    "Invalid Refresh token",
    HttpStatus.UNAUTHORIZED,
  ),

  INTERNAL_SERVER_ERROR: error(
    Code.INTERNAL_ERROR,
    "An unexpected error occurred. Please try again later.",
    HttpStatus.INTERNAL_SERVER_ERROR,
  ),

  GENERAL_ERROR: error(
    Code.GENERAL_ERROR,
    "An unexpected error occurred. Please try again later.",
    HttpStatus.BAD_REQUEST,
  ),
} as const;

function error(
  code: Code,
  message: string,
  httpStatus: HttpStatus,
): ErrorResponse {
  return { code, message: message, httpStatus };
}