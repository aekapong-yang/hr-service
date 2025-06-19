import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { EmptyResponse } from "src/shared/types/empty-response";
import { ApiStore } from "src/shared/types/types";
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
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(
    request: PutLeaveUpdateRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    return ApiResponse.success();
  }
}
