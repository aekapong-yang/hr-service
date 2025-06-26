import { Injectable } from "@nestjs/common";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { LeaveRequestRepository } from "src/shared/repository/leave-request.repository";
import { GetLeaveAllRequest } from "../dto/request/get-leave-all.request";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";
import { UtilCacheService } from "src/shared/provider/util-cache.service";

@Injectable()
export class GetLeaveAllService
  implements
    BaseService<GetLeaveAllRequest, Promise<ApiResponse<GetLeaveAllResponse[]>>>
{
  constructor(
    private readonly leaveRequestRepository: LeaveRequestRepository,
    private readonly utilService: UtilCacheService,
  ) {}

  async execute(
    request: GetLeaveAllRequest,
  ): Promise<ApiResponse<GetLeaveAllResponse[]>> {
    const [leaveTypeMap, leaveReuqests] = await Promise.all([
      this.utilService.getCacheLeaveType(),
      this.leaveRequestRepository.findLeaveAll(request),
    ]);

    const response = leaveReuqests.map((leave) =>
      this.toGetLeaveAllResponse(leave, leaveTypeMap),
    );

    return ApiResponse.success(response);
  }

  private toGetLeaveAllResponse(
    leave: LeaveRequest,
    leaveTypeMap: Map<string, string>,
  ): GetLeaveAllResponse {
    return {
      leaveId: leave.leaveId,
      leaveType: {
        label: leaveTypeMap.get(leave.leaveType) ?? "",
        value: leave.leaveType,
      },
      userId: leave.userId,
      username: leave.username,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status,
    };
  }
}
