import { Module } from "@nestjs/common";
import { LeaveController } from "./leave.controller";
import { GetLeaveAllService } from "./service/get-leave-all.service";
import { GetLeaveByIdService } from "./service/get-leave-by-id.service";
import { PostLeaveAddService } from "./service/post-leave-add.service";
import { PutLeaveUpdateService } from "./service/put-leave-update.service";
import { DeleteLeaveByIdService } from "./service/del-leave-by-id.service";
import { UtilCacheService } from "src/shared/provider/util-cache.service";

@Module({
  controllers: [LeaveController],
  providers: [
    GetLeaveAllService,
    GetLeaveByIdService,
    PostLeaveAddService,
    PutLeaveUpdateService,
    DeleteLeaveByIdService,
    UtilCacheService,
  ],
})
export class LeaveModule {}
