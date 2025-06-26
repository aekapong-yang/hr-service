import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetLeaveAllRequest } from "src/modules/leave/dto/request/get-leave-all.request";
import { Repository } from "typeorm";
import { LeaveRequest } from "../model/leave-request.entity";
import dayjs from "dayjs";
import { DateType } from "../constants/app-constant";

@Injectable()
export class LeaveRequestRepository {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRepository: Repository<LeaveRequest>,
  ) {}

  async findLeaveAll(request: GetLeaveAllRequest): Promise<LeaveRequest[]> {
    const query = this.leaveRepository.createQueryBuilder("l");

    let startDate: Date;
    let endDate: Date;

    const baseDate = dayjs(request.date);
    switch (request.dateType) {
      case DateType.YEAR:
        startDate = baseDate.startOf("year").toDate();
        endDate = baseDate.endOf("year").toDate();
        break;
      case DateType.MONTH:
        startDate = baseDate.startOf("month").toDate();
        endDate = baseDate.endOf("month").toDate();
        break;
      case DateType.WEEK:
        startDate = baseDate.startOf("week").toDate();
        endDate = baseDate.endOf("week").toDate();
        break;
      case DateType.DAY:
        startDate = baseDate.startOf("day").toDate();
        endDate = baseDate.endOf("day").toDate();
        break;
      default:
        throw new Error("Invalid dateType");
    }

    query.where("l.startDate BETWEEN :startDate AND :endDate", {
      startDate,
      endDate,
    });

    if (request.leaveType?.trim()) {
      query.where("l.leaveType = :leaveType", {
        leaveType: request.leaveType,
      });
    }

    if (request.sortCol?.trim()) {
      query.orderBy(`l.${request.sortCol}`, request.sortBy);
    }

    return await query.getMany();
  }
}
