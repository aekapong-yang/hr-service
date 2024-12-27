import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaveController } from "./controller/leave.controller";
import { LeaveRequest } from "./entity/leave-request.entity";
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
  ],
})
export class LeaveModule {}
