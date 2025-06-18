import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "auth" })
export class Auth {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "status" })
  status: string;

  @Column({ name: "access_token", nullable: true })
  accessToken: string;

  @Column({ name: "refresh_token", nullable: true })
  refreshToken: string;

  @Column({ name: "created_at", type: "datetime" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "datetime" })
  updatedAt: Date;

  @Column({ name: "last_login", type: "datetime" })
  lastLogin: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
