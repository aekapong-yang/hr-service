import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore } from "src/shared/constants/constant";
import { Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { PostLeaveAddRequest } from "../dto/request/post-leave-add.request";
import { LeaveRequest } from "../entity/leave-request.entity";
import { LeaveStatus } from "src/shared/constants/enum-constant";
import { EmptyResponse } from "src/shared/dto/empty-response";
import { ApiResponse } from "src/shared/dto/api-response";

@Injectable()
export class PostLeaveAddService
  implements BaseService<PostLeaveAddRequest, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(request: PostLeaveAddRequest): Promise<ApiResponse<EmptyResponse>> {
    const insert = this.leaveRepository.create({
      ...request,
      status: LeaveStatus.APPROVED,
    });

    await this.leaveRepository.insert(insert);
    return ApiResponse.success();
  }
}
