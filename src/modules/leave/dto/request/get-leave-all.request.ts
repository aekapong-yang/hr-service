import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { DateType, LeaveType, OrderBy } from "src/shared/constants/enum-constant";

export class GetLeaveAllRequest {
  @IsEnum(DateType)
  dateType: DateType;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsEnum(LeaveType)
  leaveType: string;

  @IsOptional()
  sortCol: string;

  @IsEnum(OrderBy)
  sortBy: OrderBy = OrderBy.ASC;
}