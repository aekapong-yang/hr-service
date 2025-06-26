import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import DatabaseConfig from "./shared/config/database.config";
import { AuthGuard } from "./shared/guard/auth.guard";
import { CacheModule } from "@nestjs/cache-manager";
import { TokenService } from "./shared/provider/token.service";
import { AuthModule } from "./modules/auth/auth.module";
import { LeaveModule } from "./modules/leave/leave.module";
import { RepositoryModule } from "./shared/repository/repository.module";
import { TaskScheduleModule } from "./modules/task-schedule/task-schedule.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),

    RepositoryModule,
    AuthModule,
    LeaveModule,
    TaskScheduleModule,
  ],
  providers: [
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
