// database.module.ts
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from '../entity/leave-request.entity';
import { Setting } from '../entity/setting.entity';
import { User } from '../entity/user.entity';
import { LeaveRequestRepository } from './leave-request.repository';
import { SettingRepository } from './setting.repository';
import { Employee } from '../entity/employee.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, Setting, User, Employee])],
  providers: [LeaveRequestRepository, SettingRepository],
  exports: [LeaveRequestRepository, SettingRepository, TypeOrmModule],
})
export class RepositoryModule {}