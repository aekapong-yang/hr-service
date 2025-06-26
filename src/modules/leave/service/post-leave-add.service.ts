import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";

import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { EmptyResponse } from "src/shared/types/empty-response";
import { PostLeaveAddRequest } from "../dto/request/post-leave-add.request";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import dayjs from "dayjs";
import { UtilCacheService } from "src/shared/provider/util-cache.service";
import { ClsService } from "nestjs-cls";
import { ApiStore } from "src/shared/types/types";
import { CacheKey } from "src/shared/constants/cache-key";
import { LeaveStatus } from "src/shared/constants/app-constant";

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
    const leaveRequest = this.leaveRepository.create({
      ...request,
      status: LeaveStatus.PENDING,
      autoApproveAt: await this.getAutoApproveAt(),
    });

    await this.leaveRepository.insert(leaveRequest);
    await this.cache.set(CacheKey.LEAVE_IS_PENDING_KEY, true);

    return ApiResponse.success();
  }

  async getAutoApproveAt(): Promise<Date> {
    const start = dayjs().startOf("year").toDate();
    const end = dayjs().endOf("year").toDate();
    const leaveCount = await this.leaveRepository.countBy({
      userId: this.clsService.get("userId"),
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
      } 
      else {
        break;
      }
    }

    const delayMinutes = autoApproveAtMap.get(matchedKey) ?? 0;
    return dayjs().add(Number(delayMinutes), "minute").toDate();
  }
}
