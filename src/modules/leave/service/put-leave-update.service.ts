import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore } from "src/shared/constants/constant";
import { Repository } from "typeorm";
import { ClsService } from "nestjs-cls";
import { PutLeaveUpdateRequest } from "../dto/request/put-leave-update.request";
import { LeaveRequest } from "../entity/leave-request.entity";
import { ApiResponse } from "src/shared/dto/api-response";
import { EmptyResponse } from "src/shared/dto/empty-response";

@Injectable()
export class PutLeaveUpdateService
  implements
    BaseService<PutLeaveUpdateRequest, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(
    request: PutLeaveUpdateRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    return ApiResponse.success();
  }
}
