import { HttpStatus } from "@nestjs/common";
import { ClsStore } from "nestjs-cls";
import { Code } from "../constants/enum-constant";

export type ErrorResponse = {
  code: Code;
  message: string;
  httpStatus: HttpStatus;
}

export type GlobalErrorMessage = {
  message: string;
}

export interface ApiStore extends ClsStore {
  userId: string;
  username: string;
  email: string;
}