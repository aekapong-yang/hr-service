import { ClsStore } from "nestjs-cls";
import { Code } from "./error-code/error-code.d";

export const BEARER: string = "Bearer ";

export interface ErrorResponse {
  code: Code;
  message: string;
}

export interface GlobalErrorMessage {
  message: string;
}

export interface ApiStore extends ClsStore {
  userId: string;
  username: string;
  email: string;
}