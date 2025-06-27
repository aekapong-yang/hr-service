import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "setting" })
export class Setting {
  @PrimaryColumn({ name: "setting_group" })
  settingGroup: string;

  @PrimaryColumn({ name: "setting_key" })
  settingKey: string;

  @Column({ name: "setting_value" })
  settingValue: string;
}
