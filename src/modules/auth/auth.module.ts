import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "src/shared/model/auth.entity";
import { OAuthService } from "src/shared/provider/microsoft/oauth.service";
import { TokenService } from "src/shared/provider/token.service";
import { AuthController } from "./auth.controller";
import { GetAuthLoginService } from "./service/get-auth-login.service";
import { GetAuthTokenService } from "./service/get-auth-token.service";
import { PostAuthLogoutService } from "./service/post-auth-logout.service";
import { PostAuthRefreshService } from "./service/post-auth-refresh.service";

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), HttpModule],
  controllers: [AuthController],
  providers: [
    GetAuthLoginService,
    GetAuthTokenService,
    PostAuthLogoutService,
    PostAuthRefreshService,
    TokenService,
    OAuthService,
  ],
})
export class AuthModule {}
