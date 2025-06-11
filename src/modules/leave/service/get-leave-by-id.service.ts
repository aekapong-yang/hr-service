import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { BusinessException } from "src/shared/exception/business.exception";
import { Repository } from "typeorm";
import { ErrorCode } from "src/shared/constants/error-code/error-code";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";
import { LeaveRequest } from "../entity/leave-request.entity";
import { ApiResponse } from "src/shared/dto/api-response";
import { log } from "console";

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
