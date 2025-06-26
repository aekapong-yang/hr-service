import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: "leave_request" })
export class LeaveRequest {
  @Generated("uuid")
  @PrimaryColumn({ name: "leave_id" })
  leaveId: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "username" })
  username: string;

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

  @Column({ name: "created_by" })
  createdBy: string;

  @Column({ name: "updated_by" })
  updatedBy: string;

  @Column({ name: "approved_by" })
  approvedBy: string;

  @Column({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "datetime" })
  updatedAt: Date;

  @Column({ name: "approved_at", type: "datetime" })
  approvedAt: Date;
}
