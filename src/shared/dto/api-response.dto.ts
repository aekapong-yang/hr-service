import { Code } from "../constants/enum-constant";
import { ErrorResponse } from "../types/types";

export class ApiResponse<T> {
  code: Code;
  message: string;
  data?: T;

  static success<T>(data?: T): ApiResponse<T> {
    return {
      code: Code.SUCCESS,
      message: "success",
      ...(data && Object.keys(data as object).length ? { data } : {}),
    };
  }

  static error(errorCode: ErrorResponse): ApiResponse<{}> {
    return { code: errorCode.code, message: errorCode.message };
  }
}
