import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClsModule } from "nestjs-cls";
import { AuthModule } from "./modules/auth/auth.module";
import { LeaveModule } from "./modules/leave/leave.module";
import config from "./shared/config/database.config";
import { AuthGuard } from "./shared/guard/auth.guard";
import { TokenService } from "./shared/provider/token.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),

    AuthModule,
    LeaveModule,
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
