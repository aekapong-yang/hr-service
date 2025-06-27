import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { Audit } from "./subscriber/audit";

@Entity({ name: "leave_request" })
export class LeaveRequest extends Audit {
  @Generated("uuid")
  @PrimaryColumn({ name: "leave_id" })
  leaveId: string;

  @Column({ name: "employee_id" })
  employeeId: string;

  @Column({ name: "leave_type" })
  leaveType: string;

  @Column({ name: "start_date", type: "date" })
  startDate: Date;

  @Column({ name: "end_date", type: "date" })
  endDate: Date;

  @Column({ name: "reason" })
  reason: string;

  @Column({ name: "status" })
  status: string;

  @Column({ name: "is_auto" })
  isAuto: boolean;

  @Column({ name: "auto_approve_at", type: "datetime" })
  autoApproveAt: Date;

  @Column({ name: "approved_by" })
  approvedBy: string;

  @Column({ name: "approved_at", type: "datetime" })
  approvedAt: Date;
}
