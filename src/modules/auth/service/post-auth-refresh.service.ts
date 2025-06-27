import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { User } from "src/shared/entity/user.entity";
import { BusinessException } from "src/shared/exception/business.exception";
import { TokenService } from "src/shared/provider/token.service";
import { Repository } from "typeorm";
import { PostAuthRefreshRequest } from "../dto/request/post-auth-refresh.request";
import { TokenResponse } from "../dto/response/auth-response.dto";

@Injectable()
export class PostAuthRefreshService
  implements BaseService<PostAuthRefreshRequest, Promise<ApiResponse<TokenResponse>>>
{
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
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
