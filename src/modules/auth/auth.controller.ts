import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Public } from "src/shared/decorator/public.decorator";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { EmptyResponse } from "src/shared/types/empty-response";
import { GetAuthTokenRequest } from "./dto/request/get-auth-token.request";
import { PostAuthLogoutRequest } from "./dto/request/post-auth-logout.request";
import { PostAuthRefreshRequest } from "./dto/request/post-auth-refresh.request";
import { TokenResponse } from "./dto/response/auth-response.dto";
import { GetAuthTokenResponse } from "./dto/response/get-auth-token-response";
import { GetAuthLoginService } from "./service/get-auth-login.service";
import { GetAuthTokenService } from "./service/get-auth-token.service";
import { PostAuthLogoutService } from "./service/post-auth-logout.service";
import { PostAuthRefreshService } from "./service/post-auth-refresh.service";

@Controller("/v1/auth")
export class AuthController {
  constructor(
    private readonly getAuthLoginService: GetAuthLoginService,
    private readonly getAuthTokenService: GetAuthTokenService,
    private readonly postAuthLogoutService: PostAuthLogoutService,
    private readonly postAuthRefreshService: PostAuthRefreshService,
  ) {}

  @Public()
  @Get("/login")
  login(): ApiResponse<GetAuthTokenResponse> {
    return this.getAuthLoginService.execute();
  }

  @Public()
  @Get("/token")
  async token(
    @Query() request: GetAuthTokenRequest,
  ): Promise<ApiResponse<TokenResponse>> {
    return this.getAuthTokenService.execute(request);
  }

  @Public()
  @Post("/logout")
  async logout(
    @Body() request: PostAuthLogoutRequest,
  ): Promise<ApiResponse<EmptyResponse>> {
    return this.postAuthLogoutService.execute(request);
  }

  @Public()
  @Post("/refresh-token")
  async refreshToken(
    @Body() request: PostAuthRefreshRequest,
  ): Promise<ApiResponse<TokenResponse>> {
    return this.postAuthRefreshService.execute(request);
  }
}
