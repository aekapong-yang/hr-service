import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./task-schedule.service";

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService],
})
export class TaskScheduleModule {}
