export enum DateType {
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
}

export enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum SettingGroup {
  LEAVE_TYPE = "LEAVE_TYPE",
}

export enum Code {
  SUCCESS = 'success',
  INVALID_PARAMETER = 'invalid_parameter',
  NOT_FOUND = 'not_found',
  UNAUTHORIZED = 'unauthorized',
  GENERAL_ERROR = 'general_error',
  INTERNAL_ERROR = 'internal_error',
  UNKNOWN_ERROR = 'unknown_error',
}