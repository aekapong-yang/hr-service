import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { DateType, OrderBy } from "src/shared/constants/enum-constant";

export class GetLeaveAllRequest {
  @IsEnum(DateType)
  dateType: DateType;

  @IsDateString()
  date: Date;

  @IsOptional()
  leaveType: string;

  @IsOptional()
  sortCol: string;

  @IsEnum(OrderBy)
  sortBy: OrderBy = OrderBy.ASC;
}