import { HttpStatus } from "@nestjs/common";
import { ErrorResponse } from "../types/types";
import { Bearer } from "./constant";
import { Code } from "./enum-constant";

function error(
  code: Code,
  message: string,
  httpStatus: HttpStatus,
): ErrorResponse {
  return { code, message: message, httpStatus };
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
    `Authorization header must start with "${Bearer}"`,
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
