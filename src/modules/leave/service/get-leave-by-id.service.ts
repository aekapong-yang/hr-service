import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ErrorCode } from "src/shared/constants/error-code/error-code";
import { ApiResponse } from "src/shared/dto/api-response";
import { BusinessException } from "src/shared/exception/business.exception";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { Repository } from "typeorm";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";

@Injectable()
export class GetLeaveByIdService
  implements BaseService<string, Promise<ApiResponse<GetLeaveAllResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
  ) {}

  async execute(leaveId: string): Promise<ApiResponse<GetLeaveAllResponse>> {
    const leaveRequest = await this.leaveRepository.findOneBy({ leaveId });
    if (!leaveRequest) {
      throw new BusinessException(
        ErrorCode.NOT_FOUND,
        `Leave request ${leaveId}`,
      );
    }
    const response = plainToInstance(GetLeaveAllResponse, leaveRequest);
    console.log(response);
    return ApiResponse.success(response);
  }
}
