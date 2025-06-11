import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveRequest } from "./entity/leave-request.entity";
import { LeaveController } from "./leave.controller";
import { LeaveRequestRepository } from "./repository/leave-request.repository";
import { GetLeaveAllService } from "./service/get-leave-all.service";
import { GetLeaveByIdService } from "./service/get-leave-by-id.service";
import { PostLeaveAddService } from "./service/post-leave-add.service";
import { PutLeaveUpdateService } from "./service/put-leave-update.service";

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest])],
  controllers: [LeaveController],
  providers: [
    GetLeaveAllService,
    GetLeaveByIdService,
    PostLeaveAddService,
    PutLeaveUpdateService,
    LeaveRequestRepository
  ],
})
export class LeaveModule {}
