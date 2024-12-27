import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  GetTokenRequest,
  PostRefreshTokenRequest,
} from "./dto/auth-request.dto";

@Controller("/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/login")
  login() {
    return this.authService.login();
  }

  @Get("/token")
  async token(@Query() request: GetTokenRequest) {
    return await this.authService.token(request);
  }

  @Post("/logout")
  async logout() {
    return await this.authService.logout();
  }

  @Post("/refresh-token")
  async refreshToken(@Body() request: PostRefreshTokenRequest) {
    return await this.authService.refreshToken(request);
  }
}
