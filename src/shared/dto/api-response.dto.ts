import { Code } from "../constants/error-code";
import { ErrorResponse } from "../types/types";

export class ApiResponse<T> {
  code: Code;
  message: string;
  data?: T;

  static success<T>(data?: T): ApiResponse<T> {
    const hasData = data !== undefined && (Array.isArray(data) ? true : Object.keys(data as object).length > 0);

    return {
      code: Code.SUCCESS,
      message: "success",
        ...(hasData ? { data } : {}),
    };
  }

  static error(errorCode: ErrorResponse): ApiResponse<{}> {
    return { code: errorCode.code, message: errorCode.message };
  }
}
