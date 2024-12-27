import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import {
  GetLeaveAllRequest,
  PostLeaveAddRequest,
  PutLeaveUpdateRequest,
} from "./dto/leave-request.dto";
import { GetLeaveAllResponse } from "./dto/leave-response.dto";
import { LeaveRequest } from "./entity/leave-request.entity";
import { LeaveService } from "./leave.service";

@Controller("/v1/leave")
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get()
  async getLeaveAll(
    @Query() request: GetLeaveAllRequest,
  ): Promise<LeaveRequest[]> {
    return await this.leaveService.getLeaveAll(request);
  }

  @Get("/:leaveId")
  async getLeaveById(
    @Param("leaveId") leaveId: string,
  ): Promise<GetLeaveAllResponse> {
    return await this.leaveService.getLeaveById(leaveId);
  }

  @Post()
  async postLeaveAdd(@Body() request: PostLeaveAddRequest): Promise<void> {
    await this.leaveService.postLeaveAdd(request);
  }

  @Put("/:leaveId")
  async putLeaveUpdate(
    @Param("leaveId") leaveId: string,
    @Body() request: PutLeaveUpdateRequest,
  ): Promise<void> {
    await this.leaveService.putLeaveUpdate({ leaveId, ...request });
  }
}
