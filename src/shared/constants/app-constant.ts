import { ClsStore } from "nestjs-cls";

export const BEARER: string = "Bearer ";

export type Code =
  | 'success'
  | 'invalid_parameter'
  | 'not_found'
  | 'unauthorized'
  | 'general_error'
  | 'internal_error'
  | 'unknown_error';

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