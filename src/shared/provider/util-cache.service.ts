import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { SettingRepository } from "../repository/setting.repository";
import { SettingGroup } from "../constants/setting-group";
import { CacheKey } from "../constants/cache-key";

@Injectable()
export class UtilCacheService {
  constructor(
    private readonly settingRepository: SettingRepository,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async getCacheLeaveType(): Promise<Map<string, string>> {
    let leaveTypeMap = await this.cache.get<Map<string, string>>(
      CacheKey.LEAVE_TYPE_MAP_KEY,
    );

    if (!leaveTypeMap) {
      const leaveTypes = await this.settingRepository.findBySettingGroup(
        SettingGroup.LEAVE_TYPE,
      );
      leaveTypeMap = new Map(
        leaveTypes.map((type) => [type.settingKey, type.settingValue]),
      );
      await this.cache.set(CacheKey.LEAVE_TYPE_MAP_KEY, leaveTypeMap);
    }

    return leaveTypeMap;
  }

  async getCacheAutoApproveAt(): Promise<Map<string, string>> {
    let leaveTypeMap = await this.cache.get<Map<string, string>>(
      CacheKey.AUTO_APPROVE_AT_KEY,
    );

    if (!leaveTypeMap) {
      const leaveTypes = await this.settingRepository.findBySettingGroup(
        SettingGroup.AUTO_APPROVE_AT,
      );
      leaveTypeMap = new Map(
        leaveTypes.map((type) => [type.settingKey, type.settingValue]),
      );
      await this.cache.set(CacheKey.AUTO_APPROVE_AT_KEY, leaveTypeMap);
    }

    return leaveTypeMap;
  }
}
