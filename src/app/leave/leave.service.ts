import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { LEAVE_REQUEST, LeaveStatus } from "src/core/constants/constant";
import { ErrorCodes } from "src/core/constants/error-code";
import { BusinessException } from "src/core/exceptions/business.exception";
import { ApiContext } from "src/core/providers/api-context.service";
import { FindManyOptions, MoreThanOrEqual, Repository } from "typeorm";
import {
  GetLeaveAllRequest,
  PostLeaveAddRequest,
  PutLeaveUpdateRequest,
} from "./dto/leave-request.dto";
import { GetLeaveAllResponse } from "./dto/leave-response.dto";
import { LeaveRequest } from "./entity/leave-request.entity";

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly apiContext: ApiContext,
  ) {}

  async getLeaveAll(request: GetLeaveAllRequest): Promise<LeaveRequest[]> {
    const query: FindManyOptions<LeaveRequest> = {
      where: { startDate: MoreThanOrEqual(request.date) },
      order: { startDate: request.sortBy },
    };
    return await this.leaveRepository.find(query);
  }

  async getLeaveById(leaveId: string): Promise<GetLeaveAllResponse> {
    const leaveRequest = await this.leaveRepository.findOneBy({ leaveId });
    if (!leaveRequest) {
      throw new BusinessException(ErrorCodes.NOT_FOUND, LEAVE_REQUEST, leaveId);
    }
    return plainToInstance(GetLeaveAllResponse, leaveRequest);
  }

  async postLeaveAdd(request: PostLeaveAddRequest): Promise<void> {
    const insert = this.leaveRepository.create({
      ...request,
      status: LeaveStatus.APPROVED,
      createdBy: this.apiContext.userId,
    });

    await this.leaveRepository.insert(insert);
  }

  public async putLeaveUpdate(request: PutLeaveUpdateRequest): Promise<void> {
    console.log(request);
  }
}
