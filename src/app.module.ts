import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "./app/auth/auth.module";
import { LeaveModule } from "./app/leave/leave.module";
import DBConfig from "./core/config/db.config";
import { AuthGuard } from "./core/guards/auth.guard";
import { TokenService } from "./core/providers/token.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    }),
    AuthModule,
    LeaveModule,
    DBConfig,
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
