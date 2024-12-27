import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore, LeaveStatus } from "src/shared/constants/constant";
import { Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { PostLeaveAddRequest } from "../dto/request/post-leave-add.request";
import { LeaveRequest } from "../entity/leave-request.entity";

@Injectable()
export class PostLeaveAddService
  implements BaseService<PostLeaveAddRequest, void>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(request: PostLeaveAddRequest): Promise<void> {
    const insert = this.leaveRepository.create({
      ...request,
      status: LeaveStatus.APPROVED,
    });

    await this.leaveRepository.insert(insert);
  }
}
