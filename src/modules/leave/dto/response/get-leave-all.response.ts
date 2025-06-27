import { ValueLabel } from "src/shared/types/types";

export class GetLeaveAllResponse {
  leaveId: string;
  employeeId: string;
  leaveType: ValueLabel;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
}
