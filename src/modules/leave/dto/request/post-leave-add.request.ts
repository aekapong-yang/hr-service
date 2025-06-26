import { IsDateString } from "class-validator";
import { IsLessThanOrEqualTo } from "src/shared/validator/is-less-than-or-equal-to.validator";
import { IsNotBlank } from "src/shared/validator/is-not-bank.validator";
import { IsNotWeekend } from "src/shared/validator/is-not-weekend.validator";

export class PostLeaveAddRequest {
  @IsNotBlank()
  leaveType: string;

  @IsDateString()
  @IsNotWeekend()
  @IsLessThanOrEqualTo("endDate")
  startDate: Date;

  @IsDateString()
  @IsNotWeekend()
  endDate: Date;

  @IsNotBlank()
  reason: string;
}
