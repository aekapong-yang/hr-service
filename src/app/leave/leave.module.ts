import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiContext } from "src/core/providers/api-context.service";
import { LeaveRequest } from "./entity/leave-request.entity";
import { LeaveController } from "./leave.controller";
import { LeaveService } from "./leave.service";

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest])],
  controllers: [LeaveController],
  providers: [LeaveService, ApiContext],
})
export class LeaveModule {}
