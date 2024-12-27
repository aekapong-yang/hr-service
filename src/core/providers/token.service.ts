import { Injectable } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request } from "express";
import { Payload, TokenResponse } from "src/app/auth/dto/auth-response.dto";
import { Auth } from "src/app/auth/entity/auth.entity";
import { BEARER } from "../constants/constant";
import { ErrorCodes } from "../constants/error-code";
import { BusinessException } from "../exceptions/business.exception";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(auth: Auth): Promise<TokenResponse> {
    const payload: Payload = {
      userId: auth.userId,
      username: auth.username,
      email: auth.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.ACCESS_TOKEN_EXP,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXP,
      }),
    };
  }

  async verifyToken(token: string): Promise<Payload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BusinessException(
          ErrorCodes.INVALID_ACCESS_TOKEN,
          error.message,
        );
      }

      if (error instanceof JsonWebTokenError) {
        throw new BusinessException(
          ErrorCodes.INVALID_ACCESS_TOKEN,
          error.message,
        );
      }

      throw new BusinessException(ErrorCodes.INVALID_ACCESS_TOKEN);
    }
  }

  async verifyAccessToken(request: Request): Promise<Payload> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BusinessException(ErrorCodes.INVALID_ACCESS_TOKEN);
    }

    if (!authHeader.startsWith(BEARER)) {
      throw new BusinessException(ErrorCodes.INVALID_BEARER_START_WITH);
    }

    const accessToken = authHeader.slice(7);
    return await this.verifyToken(accessToken);
  }
}
