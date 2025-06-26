// database.module.ts
import { Global, Module } from '@nestjs/common';
import { LeaveRequestRepository } from './leave-request.repository';
import { SettingRepository } from './setting.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from '../model/leave-request.entity';
import { Setting } from '../model/setting.entity';
import { Auth } from '../model/auth.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, Setting, Auth])],
  providers: [LeaveRequestRepository, SettingRepository],
  exports: [LeaveRequestRepository, SettingRepository, TypeOrmModule],
})
export class RepositoryModule {}