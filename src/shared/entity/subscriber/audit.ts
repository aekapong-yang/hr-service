import { Column } from "typeorm";

export class Audit {
  @Column({ name: "created_by" })
  createdBy: string;

  @Column({ name: "updated_by" })
  updatedBy: string;

  @Column({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "datetime" })
  updatedAt: Date;
}
