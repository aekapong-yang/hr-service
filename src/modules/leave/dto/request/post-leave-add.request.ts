import { IsDateString, IsIn, IsOptional } from "class-validator";
import { LEAVE_TYPE_IN } from "src/shared/constants/constant";

export class PostLeaveAddRequest {
  @IsIn(LEAVE_TYPE_IN)
  leaveType: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  reason: string;
}
