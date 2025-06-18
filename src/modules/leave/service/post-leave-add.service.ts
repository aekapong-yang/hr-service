import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore } from "src/shared/constants/app-constant";
import { Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { LeaveStatus } from "src/shared/constants/enum-constant";
import { ApiResponse } from "src/shared/dto/api-response";
import { EmptyResponse } from "src/shared/dto/empty-response";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { PostLeaveAddRequest } from "../dto/request/post-leave-add.request";

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
