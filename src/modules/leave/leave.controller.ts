import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";

import { ApiResponse } from "src/shared/dto/api-response";
import { GetLeaveAllRequest } from "./dto/request/get-leave-all.request";
import { PostLeaveAddRequest } from "./dto/request/post-leave-add.request";
import { PutLeaveUpdateRequest } from "./dto/request/put-leave-update.request";
import { GetLeaveAllResponse } from "./dto/response/get-leave-all.response";
import { GetLeaveAllService } from "./service/get-leave-all.service";
import { GetLeaveByIdService } from "./service/get-leave-by-id.service";
import { PostLeaveAddService } from "./service/post-leave-add.service";
import { PutLeaveUpdateService } from "./service/put-leave-update.service";
import { EmptyResponse } from "src/shared/dto/empty-response";

@Controller("/v1/leaves")
export class LeaveController {
  constructor(
    private readonly getLeaveAllService: GetLeaveAllService,
    private readonly getLeaveByIdService: GetLeaveByIdService,
    private readonly postLeaveAddService: PostLeaveAddService,
    private readonly putLeaveUpdateService: PutLeaveUpdateService,
  ) {}

  @Get()
  async getLeaveAll(
    @Query() request: GetLeaveAllRequest,
  ): Promise<ApiResponse<GetLeaveAllResponse[]>> {
    return this.getLeaveAllService.execute(request);
  }

  @Get("/:leaveId")
  async getLeaveById(
    @Param("leaveId") leaveId: string,
  ): Promise<ApiResponse<GetLeaveAllResponse>> {
    return this.getLeaveByIdService.execute(leaveId);
  }

  @Post()
  async postLeaveAdd(
    @Body() request: PostLeaveAddRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    return this.postLeaveAddService.execute(request);
  }

  @Put("/:leaveId")
  async putLeaveUpdate(
    @Param("leaveId") leaveId: string,
    @Body() request: PutLeaveUpdateRequest,
  ):Promise<ApiResponse<EmptyResponse>> {
   return this.putLeaveUpdateService.execute({ leaveId, ...request });
  }
}
