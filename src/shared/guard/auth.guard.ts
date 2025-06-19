import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ClsService } from "nestjs-cls";
import { Payload } from "src/modules/auth/dto/response/auth-response.dto";
import { IS_PUBLIC_KEY } from "../decorator/public.decorator";
import { TokenService } from "../provider/token.service";
import { ApiStore } from "../types/types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
    private readonly cls: ClsService<ApiStore>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const payload = await this.tokenService.verifyAccessToken(request);

    if (payload) {
      this.toApiStore(payload);
    }

    return !!payload;
  }

  private toApiStore(payload: Payload) {
    this.cls.set("userId", payload.userId);
    this.cls.set("username", payload.username);
    this.cls.set("email", payload.email);
  }
}
