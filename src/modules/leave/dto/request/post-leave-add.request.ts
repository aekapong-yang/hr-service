import { IsDateString, IsOptional } from "class-validator";
import { IsNotBlank } from "src/shared/decorator/is-not-bank.decorator";

export class PostLeaveAddRequest {
  @IsNotBlank()
  leaveType: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  reason: string;
}
