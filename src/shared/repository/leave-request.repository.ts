import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetLeaveAllRequest } from "src/modules/leave/dto/request/get-leave-all.request";
import { FindManyOptions, MoreThanOrEqual, Repository } from "typeorm";
import { LeaveRequest } from "../model/leave-request.entity";

@Injectable()
export class LeaveRequestRepository {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
  ) {}

  async findLeaveAll(request: GetLeaveAllRequest): Promise<LeaveRequest[]> {
    const query: FindManyOptions<LeaveRequest> = {
      where: { startDate: MoreThanOrEqual(request.date) },
      order: { startDate: request.sortBy },
    };

    return await this.leaveRepository.find(query);
  }
}
