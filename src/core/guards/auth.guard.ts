/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ErrorCodes } from "../constants/error-code";
import { BusinessException } from "../exceptions/business.exception";
import { TokenService } from "../providers/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly appContext = process.env.APP_CONTEXT_PATH;
  private readonly authPaths = [
    `${this.appContext}/v1/auth/login`,
    `${this.appContext}/v1/auth/token`,
    `${this.appContext}/v1/auth/logout`,
    `${this.appContext}/v1/auth/refresh-token`,
  ];

  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (this.authPaths.includes(request.path)) {
      return true;
    }

    return this.isValidAccessToken(request);
  }

  private async isValidAccessToken(request: Request): Promise<boolean> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BusinessException(ErrorCodes.INVALID_ACCESS_TOKEN);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new BusinessException(
        ErrorCodes.INVALID_ACCESS_TOKEN,
        'Authorization header must start with "Bearer "',
      );
    }

    const accessToken = authHeader.slice(7);
    await this.tokenService.verifyToken(accessToken);
    return true;
  }
}
