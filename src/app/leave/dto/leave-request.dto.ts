import { IsDateString, IsEnum, IsIn, IsOptional } from "class-validator";
import { DateType, LEAVE_TYPE_IN, OrderBy } from "src/core/constants/constant";

export class GetLeaveAllRequest {
  @IsEnum(DateType)
  dateType: DateType = DateType.MONTH;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsIn(LEAVE_TYPE_IN)
  leaveType: string;

  sortCol: string;

  @IsEnum(OrderBy)
  sortBy: OrderBy = OrderBy.ASC;
}

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

export class PutLeaveUpdateRequest extends PostLeaveAddRequest {
  leaveId: string;
}
