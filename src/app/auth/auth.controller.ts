import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Public } from "src/core/decorators/public.decorator";
import { AuthService } from "./auth.service";
import {
  GetTokenRequest,
  PostAccessTokenRequest,
  PostRefreshTokenRequest,
} from "./dto/auth-request.dto";

@Controller("/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get("/login")
  login() {
    return this.authService.login();
  }

  @Public()
  @Get("/token")
  async token(@Query() request: GetTokenRequest) {
    return await this.authService.token(request);
  }

  @Public()
  @Post("/logout")
  async logout(@Body() request: PostAccessTokenRequest) {
    return await this.authService.logout(request);
  }

  @Public()
  @Post("/refresh-token")
  async refreshToken(@Body() request: PostRefreshTokenRequest) {
    return await this.authService.refreshToken(request);
  }
}
