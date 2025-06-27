import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/entity/leave-request.entity";
import { BusinessException } from "src/shared/exception/business.exception";
import { EmptyResponse } from "src/shared/types/empty-response";
import { Repository } from "typeorm";
import { PutLeaveUpdateRequest } from "../dto/request/put-leave-update.request";

@Injectable()
export class PutLeaveUpdateService
  implements
    BaseService<PutLeaveUpdateRequest, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
  ) {}

  async execute(
    request: PutLeaveUpdateRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    const { leaveId, ...requestData } = request;
    const leaveRequest = await this.leaveRepository.findOneBy({ leaveId });
    if (!leaveRequest) {
      throw new BusinessException(ErrorCode.NOT_FOUND);
    }

    await this.leaveRepository.update({ leaveId }, requestData);
    return ApiResponse.success();
  }
}
