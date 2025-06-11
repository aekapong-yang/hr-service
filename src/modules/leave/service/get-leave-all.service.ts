import { Injectable } from "@nestjs/common";
import { GetLeaveAllRequest } from "../dto/request/get-leave-all.request";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";
import { LeaveRequest } from "../entity/leave-request.entity";
import { LeaveRequestRepository } from "../repository/leave-request.repository";
import { ApiResponse } from "src/shared/dto/api-response";

@Injectable()
export class GetLeaveAllService
  implements
    BaseService<GetLeaveAllRequest, Promise<ApiResponse<GetLeaveAllResponse[]>>>
{
  constructor(
    private readonly leaveRequestRepository: LeaveRequestRepository,
  ) {}

  async execute(
    request: GetLeaveAllRequest,
  ): Promise<ApiResponse<GetLeaveAllResponse[]>> {
    const leaves = await this.leaveRequestRepository.findLeaveAll(request);
    return ApiResponse.success(leaves.map(this.toGetLeaveAllResponse));
  }

  private toGetLeaveAllResponse(leave: LeaveRequest): GetLeaveAllResponse {
    return {
      leaveId: leave.leaveId,
      leaveType: leave.leaveType,
      userId: leave.userId,
      username: leave.username,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    };
  }
}
