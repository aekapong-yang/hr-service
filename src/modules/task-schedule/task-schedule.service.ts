import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { AppConstant, LeaveStatus } from "src/shared/constants/app-constant";
import { LessThanOrEqual, Repository } from "typeorm";
import { LeaveRequest } from "../../shared/entity/leave-request.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
  ) {}

  @Cron("0 */1 * * * *")
  async taskSchedule() {
    const leaves = await this.leaveRepository.find({
      where: {
        status: LeaveStatus.PENDING,
        autoApproveAt: LessThanOrEqual(new Date()),
      },
    });

    for (const leave of leaves) {
      await this.leaveRepository.save({
        ...leave,
        status: LeaveStatus.APPROVED,
        approvedBy: AppConstant.SYSTEM,
        isAuto: true,
        approvedAt: new Date(),
      });
    }
  }
}
