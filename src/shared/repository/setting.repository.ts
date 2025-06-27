import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Setting } from "src/shared/entity/setting.entity";
import { Equal, FindManyOptions, Repository } from "typeorm";

@Injectable()
export class SettingRepository {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async findBySettingGroup(settingGroup: string): Promise<Setting[]> {
    const query: FindManyOptions<Setting> = {
      where: { settingGroup: Equal(settingGroup) },
    };
    return this.settingRepository.find(query);
  }
}
