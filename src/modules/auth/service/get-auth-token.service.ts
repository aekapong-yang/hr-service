import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserStatus } from "src/shared/constants/app-constant";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { User } from "src/shared/entity/user.entity";
import { OAuthService } from "src/shared/provider/microsoft/oauth.service";
import { TokenService } from "src/shared/provider/token.service";
import { Repository } from "typeorm";
import { GetAuthTokenRequest } from "../dto/request/get-auth-token.request";
import { TokenResponse } from "../dto/response/auth-response.dto";

@Injectable()
export class GetAuthTokenService
  implements BaseService<GetAuthTokenRequest, Promise<ApiResponse<TokenResponse>>>
{
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly oAuthService: OAuthService,
  ) {}

  async execute(request: GetAuthTokenRequest): Promise<ApiResponse<TokenResponse>> {
    const { code } = request;
    let auth: User;
    if (process.env.MS_AUTH_BYPASS === "true") {
      auth = this.authRepository.create({
        userId: code,
        username: code,
        email: `${code}@ie-solutions.co.th`,
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
      else {
        auth = result;
      }
    }

    const token = await this.tokenService.generateToken(auth);
    const create = this.authRepository.create({
      ...auth,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });

    await this.authRepository.save(create);
    
    return ApiResponse.success(token);
  }
}
