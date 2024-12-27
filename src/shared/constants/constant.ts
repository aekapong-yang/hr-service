import { ClsStore } from "nestjs-cls";
import { Code } from "./error-code/error-code";

export enum DateType {
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}
export const AUTH_PATH_INGORE: DateType = DateType.MONTH;

export enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}

// =========== Start Leave Section =========================
export type LeaveType = "ML" | "MLT" | "OL" | "PL" | "SL" | "VL";
export const LEAVE_TYPE_IN: LeaveType[] = ["ML", "MLT", "OL", "PL", "SL", "VL"];
export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
// =========== End Leave Section =========================

// =========== Start Utils Section =========================
export const LEAVE_REQUEST: string = "Leave request";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
// =========== End Utils Section =========================

// =========== Start Auth Section =========================
export const BEARER: string = "Bearer ";
// =========== End Auth Section =========================

// =========== Start Error Section =========================
export interface ErrorResponse {
  code: Code;
  message: string;
}

export interface GlobalErrorMessage {
  message: string;
}
// =========== End Error Section =========================

export interface ApiStore extends ClsStore {
  userId: string;
  username: string;
  email: string;
}
