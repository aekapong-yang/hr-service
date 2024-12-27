import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { ApiStore, LEAVE_REQUEST } from "src/shared/constants/constant";
import { BusinessException } from "src/shared/exception/business.exception";
import { Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { ErrorCode } from "src/shared/constants/error-code/error-code";
import { GetLeaveAllResponse } from "../dto/response/get-leave-all.response";
import { LeaveRequest } from "../entity/leave-request.entity";

@Injectable()
export class GetLeaveByIdService
  implements BaseService<string, GetLeaveAllResponse>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(leaveId: string): Promise<GetLeaveAllResponse> {
    const leaveRequest = await this.leaveRepository.findOneBy({ leaveId });
    if (!leaveRequest) {
      throw new BusinessException(ErrorCode.NOT_FOUND, LEAVE_REQUEST, leaveId);
    }
    return plainToInstance(GetLeaveAllResponse, leaveRequest);
  }
}
