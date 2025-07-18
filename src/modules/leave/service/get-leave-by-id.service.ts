import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/entity/leave-request.entity";
import { BusinessException } from "src/shared/exception/business.exception";
import { UtilCacheService } from "src/shared/provider/util-cache.service";
import { Repository } from "typeorm";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";
import { GetLeaveByIdResponse } from "../dto/response/get-leave-by-id.response";

@Injectable()
export class GetLeaveByIdService
  implements BaseService<string, Promise<ApiResponse<GetLeaveAllResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly utilService: UtilCacheService,
  ) {}

  async execute(leaveId: string): Promise<ApiResponse<GetLeaveByIdResponse>> {
    const leaveTypeMap = await this.utilService.getCacheLeaveType();
    const leaveRequest = await this.leaveRepository.findOneBy({ leaveId });
    if (!leaveRequest) {
      throw new BusinessException(ErrorCode.NOT_FOUND);
    }
    const response = this.toGetLeaveAllResponse(leaveRequest, leaveTypeMap);
    return ApiResponse.success(response);
  }

  private toGetLeaveAllResponse(
    leaveRequest: LeaveRequest,
    leaveTypeMap: Map<string, string>,
  ): GetLeaveByIdResponse {
    return {
      leaveId: leaveRequest.leaveId,
      employeeId: leaveRequest.employeeId,
      leaveType: {
        label: leaveTypeMap.get(leaveRequest.leaveType) ?? "",
        value: leaveRequest.leaveType,
      },
      startDate: leaveRequest.startDate,
      endDate: leaveRequest.endDate,
      reason: leaveRequest.reason,
      status: leaveRequest.status,
      isAuto: leaveRequest.isAuto,
      autoApproveAt: leaveRequest.autoApproveAt,
      createdBy: leaveRequest.createdBy,
      updatedBy: leaveRequest.updatedBy,
      approvedBy: leaveRequest.approvedBy,
      createdAt: leaveRequest.createdAt,
      updatedAt: leaveRequest.updatedAt,
      approvedAt: leaveRequest.approvedAt,
    };
  }
}
