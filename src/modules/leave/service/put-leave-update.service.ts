import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore } from "src/shared/constants/constant";
import { Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { PutLeaveUpdateRequest } from "../dto/request/put-leave-update.request";
import { LeaveRequest } from "../entity/leave-request.entity";

@Injectable()
export class PutLeaveUpdateService
  implements BaseService<PutLeaveUpdateRequest, void>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(request: PutLeaveUpdateRequest): Promise<void> {
    console.log(request);
  }
}
