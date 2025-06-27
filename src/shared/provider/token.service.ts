import { Employee } from "./../entity/employee.entity";
import { Injectable } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request } from "express";
import {
  Payload,
  TokenResponse,
} from "src/modules/auth/dto/response/auth-response.dto";
import { AppConstant } from "../constants/app-constant";
import { ErrorCode } from "../constants/error-code";
import { User } from "../entity/user.entity";
import { BusinessException } from "../exception/business.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async generateToken(auth: User): Promise<TokenResponse> {
    const employee = await this.employeeRepository.findOneBy({
      email: auth.email,
    });
    const payload: Payload = {
      userId: auth.userId,
      username: auth.username,
      email: auth.email,
      employeeId: employee?.employeeId ?? "",
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
          ErrorCode.INVALID_ACCESS_TOKEN,
          error.message,
        );
      }

      if (error instanceof JsonWebTokenError) {
        throw new BusinessException(
          ErrorCode.INVALID_ACCESS_TOKEN,
          error.message,
        );
      }

      throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
    }
  }

  async verifyAccessToken(request: Request): Promise<Payload> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    if (!authHeader.startsWith(AppConstant.BEAERE)) {
      throw new BusinessException(ErrorCode.INVALID_BEARER_START_WITH);
    }

    const accessToken = authHeader.slice(7);
    return await this.verifyToken(accessToken);
  }
}
