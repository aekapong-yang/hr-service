import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code/error-code";
import { ApiResponse } from "src/shared/dto/api-response";
import { BusinessException } from "src/shared/exception/business.exception";
import { TokenService } from "src/shared/provider/token.service";
import { Repository } from "typeorm";
import { PostAuthRefreshRequest } from "../dto/request/post-auth-refresh.request";
import { TokenResponse } from "../dto/response/auth-response.dto";
import { Auth } from "../entity/auth.entity";

@Injectable()
export class PostAuthRefreshService
  implements BaseService<PostAuthRefreshRequest, Promise<ApiResponse<TokenResponse>>>
{
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: PostAuthRefreshRequest): Promise<ApiResponse<TokenResponse>> {
    const { refreshToken } = request;
    const { userId } = await this.tokenService.verifyToken(refreshToken);
    const auth = await this.authRepository.findOneBy({ userId, refreshToken });
    if (!auth) {
      throw new BusinessException(ErrorCode.INVALID_REFRESH_TOKEN);
    }

    const token: TokenResponse = await this.tokenService.generateToken(auth);

    const update = this.authRepository.create({
      ...auth,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });

    this.authRepository.save(update);
    return ApiResponse.success(token);
  }
}
