import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiStore } from "src/shared/constants/constant";
import { FindManyOptions, MoreThanOrEqual, Repository } from "typeorm";

import { ClsService } from "nestjs-cls";
import { GetLeaveAllRequest } from "../dto/request/get-leave-all.request";
import { LeaveRequest } from "../entity/leave-request.entity";

@Injectable()
export class GetLeaveAllService
  implements BaseService<GetLeaveAllRequest, LeaveRequest[]>
{
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async execute(request: GetLeaveAllRequest): Promise<LeaveRequest[]> {
    console.log(this.cls.get("userId"));

    const query: FindManyOptions<LeaveRequest> = {
      where: { startDate: MoreThanOrEqual(request.date) },
      order: { startDate: request.sortBy },
    };
    return await this.leaveRepository.find(query);
  }
  
}
