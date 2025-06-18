import { Injectable } from "@nestjs/common";
import { SettingGroup } from "src/shared/constants/enum-constant";
import { ApiResponse } from "src/shared/dto/api-response";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { LeaveRequestRepository } from "src/shared/repository/leave-request.repository";
import { SettingRepository } from "src/shared/repository/setting.repository";
import { GetLeaveAllRequest } from "../dto/request/get-leave-all.request";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";

@Injectable()
export class GetLeaveAllService
  implements
    BaseService<GetLeaveAllRequest, Promise<ApiResponse<GetLeaveAllResponse[]>>>
{
  constructor(
    private readonly leaveRequestRepository: LeaveRequestRepository,
    private readonly settingRepository: SettingRepository,
  ) {}

  async execute(
    request: GetLeaveAllRequest,
  ): Promise<ApiResponse<GetLeaveAllResponse[]>> {
    const leaveTypeMap = await this.getLeaveTypeMap();
    const leaves = await this.leaveRequestRepository.findLeaveAll(request);
    const response = leaves.map((leave) =>
      this.toGetLeaveAllResponse(leave, leaveTypeMap),
    );
    return ApiResponse.success(response);
  }

  private async getLeaveTypeMap(): Promise<Map<string, string>> {
    const leaveTypes =
      await this.settingRepository.findBySettingGroup(SettingGroup.LEAVE_TYPE);
    return new Map(
      leaveTypes.map((type) => [type.settingKey, type.settingValue]),
    );
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
    };
  }
}
