import { Column, Entity, PrimaryColumn } from "typeorm";
import { Audit } from "./subscriber/audit";

@Entity({ name: "employee" })
export class Employee extends Audit {
  @PrimaryColumn({ name: "employee_id" })
  employeeId: string;

  @Column({ name: "full_name" })
  fullName: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "position" })
  position: string;

  @Column({ name: "department" })
  department: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "phone" })
  phone: string;

  @Column({ name: "line_user_id" })
  lineUserId: string;

  @Column({ name: "line_group_id" })
  lineGroupId: string;

  @Column({ name: "hire_date", type: "date" })
  hireDate: Date;

  @Column({ type: "varchar" })
  status: string;
}
