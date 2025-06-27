import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { LeaveStatus } from "src/shared/constants/app-constant";
import { CacheKey } from "src/shared/constants/cache-key";
import { ErrorCode } from "src/shared/constants/error-code";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/entity/leave-request.entity";
import { BusinessException } from "src/shared/exception/business.exception";
import { EmptyResponse } from "src/shared/types/empty-response";
import { Repository } from "typeorm";

@Injectable()
export class DeleteLeaveByIdService
  implements BaseService<string, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async execute(leaveId: string): Promise<ApiResponse<EmptyResponse>> {
    const exists = await this.leaveRepository.existsBy({
      leaveId,
      status: LeaveStatus.PENDING,
    });

    if (!exists) {
      throw new BusinessException(ErrorCode.NOT_FOUND);
    }

    await this.leaveRepository.delete({ leaveId });
    await this.checkLeaveAllPending();

    return ApiResponse.success();
  }

  async checkLeaveAllPending() {
    const hasPending = await this.leaveRepository.existsBy({
      status: LeaveStatus.PENDING,
    });
    if (!hasPending) {
      await this.cache.set(CacheKey.LEAVE_IS_PENDING_KEY, false);
    }
  }
}
