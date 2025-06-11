import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { LeaveType } from "src/shared/constants/enum-constant";

export class PostLeaveAddRequest {
  @IsEnum(LeaveType)
  leaveType: LeaveType;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  reason: string;
}
