import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Payload } from "src/modules/auth/dto/response/auth-response.dto";
import { Bearer } from "../constants/constant";
import { ErrorCode } from "../constants/error-code.constant";
import { BusinessException } from "../exception/business.exception";

@Injectable({ scope: Scope.REQUEST })
export class ApiContextService {
  readonly userId: string;
  readonly username: string;
  readonly email: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtService: JwtService,
  ) {
    const payload = this.extractAccessToken(request);

    this.userId = payload?.userId;
    this.username = payload?.username;
    this.email = payload?.email;
  }

  extractAccessToken(request: Request): Payload {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    if (!authHeader.startsWith(Bearer)) {
      throw new BusinessException(ErrorCode.INVALID_BEARER_START_WITH);
    }

    const accessToken = authHeader.slice(7);
    this.jwtService.verify(accessToken);
    return this.jwtService.decode(accessToken);
  }
}
