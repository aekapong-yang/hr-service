import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, MoreThanOrEqual, Repository } from "typeorm";
import { GetLeaveAllRequest } from "../dto/request/get-leave-all.request";
import { LeaveRequest } from "../entity/leave-request.entity";

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
