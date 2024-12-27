import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import {
  LEAVE_REQUEST,
  LeaveStatus
} from "src/core/constants/constant";
import { ErrorCodes } from "src/core/constants/error-code";
import { BusinessException } from "src/core/exceptions/business.exception";
import { FindManyOptions, MoreThanOrEqual, Repository } from "typeorm";
import {
  GetLeaveAllRequest,
  PostLeaveAddRequest,
  PutLeaveUpdateRequest,
} from "./dto/leave-request.dto";
import { GetLeaveAllResponse } from "./dto/leave-response.dto";
import { LeaveRequest } from "./entity/leave-request.entity";
import { ApiContext } from "src/core/providers/api-context.service";

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
    private readonly apiContext: ApiContext,
  ) {}

  async getLeaveAll(request: GetLeaveAllRequest): Promise<LeaveRequest[]> {
    console.log(this.apiContext.getUserId());
    
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
    await this.leaveRepository.insert({
      ...request,
      status: LeaveStatus.APPROVED,
      createdBy: "ben",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public async putLeaveUpdate(request: PutLeaveUpdateRequest): Promise<void> {
    console.log(request);
  }
}
