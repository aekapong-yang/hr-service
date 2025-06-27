import { ValueLabel } from "src/shared/types/types";

export class GetLeaveByIdResponse {
  leaveId: string;
  employeeId: string;
  leaveType: ValueLabel;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
  isAuto: boolean;
  autoApproveAt: Date;
  createdBy: string;
  updatedBy: string;
  approvedBy: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt: Date;
}
