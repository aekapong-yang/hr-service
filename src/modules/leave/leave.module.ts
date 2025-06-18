import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveRequest } from "src/shared/model/leave-request.entity";
import { Setting } from "src/shared/model/setting.entity";
import { LeaveRequestRepository } from "src/shared/repository/leave-request.repository";
import { SettingRepository } from "src/shared/repository/setting.repository";
import { LeaveController } from "./leave.controller";
import { GetLeaveAllService } from "./service/get-leave-all.service";
import { GetLeaveByIdService } from "./service/get-leave-by-id.service";
import { PostLeaveAddService } from "./service/post-leave-add.service";
import { PutLeaveUpdateService } from "./service/put-leave-update.service";

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, Setting])],
  controllers: [LeaveController],
  providers: [
    GetLeaveAllService,
    GetLeaveByIdService,
    PostLeaveAddService,
    PutLeaveUpdateService,
    LeaveRequestRepository,
    SettingRepository
  ],
})
export class LeaveModule {}
