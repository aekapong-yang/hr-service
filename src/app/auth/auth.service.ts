import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserStatus } from "src/core/constants/constant";
import { ErrorCodes } from "src/core/constants/error-code";
import { BusinessException } from "src/core/exceptions/business.exception";
import { OAuthService } from "src/core/providers/oauth.service";
import { TokenService } from "src/core/providers/token.service";
import { Repository } from "typeorm";
import {
  GetTokenRequest,
  PostAccessTokenRequest,
  PostRefreshTokenRequest,
} from "./dto/auth-request.dto";
import { TokenResponse } from "./dto/auth-response.dto";
import { Auth } from "./entity/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly tokenService: TokenService,
    private readonly oAuthService: OAuthService,
    private readonly configService: ConfigService,
  ) {}

  login() {
    const AUTH_PARAMS: URLSearchParams = new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID,
      redirect_url: process.env.MS_REDIRECT_URL,
      response_type: process.env.MS_RESPONSE_TYPE,
      response_mode: process.env.MS_RESPONSE_MODE,
      scope: process.env.MS_SCOPE,
    });

    return { url: `${process.env.MS_URL}/authorize?${AUTH_PARAMS}` };
  }

  async token(request: GetTokenRequest): Promise<TokenResponse> {
    const { code } = request;
    let auth: Auth;
    if (this.configService.get<boolean>("MS_AUTH_BYPASS", false)) {
      auth = this.authRepository.create({
        userId: code,
        username: code,
        email: `${code}@gmail.com`,
        status: UserStatus.ACTIVE,
      });
    } else {
      const { access_token } = await this.oAuthService.getAccessToken(code);
      const { id, displayName, mail } =
        await this.oAuthService.getUserProfile(access_token);

      const result = await this.authRepository.findOneBy({ userId: id });
      if (!result) {
        auth = this.authRepository.create({
          userId: id,
          username: displayName,
          email: mail,
          status: UserStatus.ACTIVE,
        });
      }
    }

    const token = await this.tokenService.generateToken(auth);
    const create = this.authRepository.create({
      ...auth,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      lastLogin: new Date(),
    });

    await this.authRepository.save(create);
    return token;
  }

  async logout(request: PostAccessTokenRequest): Promise<void> {
    const { accessToken } = request;
    const { userId } = await this.tokenService.verifyToken(accessToken);
    const auth = await this.authRepository.findOneBy({ userId, accessToken });
    if (!auth) {
      throw new BusinessException(ErrorCodes.INVALID_ACCESS_TOKEN);
    }

    const update = this.authRepository.create({
      ...auth,
      accessToken: null,
      refreshToken: null,
    });
    this.authRepository.save(update);
  }

  async refreshToken(request: PostRefreshTokenRequest): Promise<TokenResponse> {
    const { refreshToken } = request;
    const { userId } = await this.tokenService.verifyToken(refreshToken);
    const auth = await this.authRepository.findOneBy({ userId, refreshToken });
    if (!auth) {
      throw new BusinessException(ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    const token: TokenResponse = await this.tokenService.generateToken(auth);

    const update = this.authRepository.create({
      ...auth,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });

    this.authRepository.save(update);
    return token;
  }
}
