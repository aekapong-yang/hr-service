import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import dayjs from "dayjs";
import { ClsService } from "nestjs-cls";
import { LeaveStatus } from "src/shared/constants/app-constant";
import { CacheKey } from "src/shared/constants/cache-key";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/entity/leave-request.entity";
import { UtilCacheService } from "src/shared/provider/util-cache.service";
import { EmptyResponse } from "src/shared/types/empty-response";
import { ApiStore } from "src/shared/types/types";
import { PostLeaveAddRequest } from "../dto/request/post-leave-add.request";

@Injectable()
export class PostLeaveAddService
  implements
    BaseService<PostLeaveAddRequest, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly utilCacheService: UtilCacheService,
    private readonly clsService: ClsService<ApiStore>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async execute(
    request: PostLeaveAddRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    const employeeId = this.clsService.get("employeeId");
    const leaveRequest = this.leaveRepository.create({
      ...request,
      employeeId: employeeId,
      status: LeaveStatus.PENDING,
      autoApproveAt: await this.getAutoApproveAt(employeeId),
    });

    await this.leaveRepository.insert(leaveRequest);
    await this.cache.set(CacheKey.LEAVE_IS_PENDING_KEY, true);

    return ApiResponse.success();
  }

  async getAutoApproveAt(employeeId: string): Promise<Date> {
    const start = dayjs().startOf("year").toDate();
    const end = dayjs().endOf("year").toDate();
    const leaveCount = await this.leaveRepository.countBy({
      employeeId: employeeId,
      createdAt: Between(start, end),
    });

    const autoApproveAtMap =
      await this.utilCacheService.getCacheAutoApproveAt();
    const keys = Array.from(autoApproveAtMap.keys()).sort(
      (a, b) => Number(a) - Number(b),
    );

    let matchedKey = keys[0];
    for (const key of keys) {
      if (leaveCount >= Number(key)) {
        matchedKey = key;
      } else {
        break;
      }
    }

    const delayMinutes = autoApproveAtMap.get(matchedKey) ?? 0;
    return dayjs().add(Number(delayMinutes), "minute").toDate();
  }
}
