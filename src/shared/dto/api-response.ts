import { Code } from "../constants/error-code";

export class ApiResponse<T> {
  code: Code;
  message: string;
  data?: T;

   static success<T>(data?: T): ApiResponse<T | null> {
    return { code: "success", message: "success", data: data ?? null };
  }
}
