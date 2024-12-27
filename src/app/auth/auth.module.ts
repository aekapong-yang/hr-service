import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OAuthService } from "src/core/providers/oauth.service";
import { TokenService } from "src/core/providers/token.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Auth } from "./entity/auth.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), HttpModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, OAuthService],
})
export class AuthModule {}
