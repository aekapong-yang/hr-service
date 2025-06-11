import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code/error-code";
import { ApiResponse } from "src/shared/dto/api-response";
import { EmptyResponse } from "src/shared/dto/empty-response";
import { BusinessException } from "src/shared/exception/business.exception";
import { TokenService } from "src/shared/provider/token.service";
import { Repository } from "typeorm";
import { PostAuthLogoutRequest } from "../dto/request/post-auth-logout.request";
import { Auth } from "../entity/auth.entity";

@Injectable()
export class PostAuthLogoutService
  implements BaseService<PostAuthLogoutRequest, Promise<ApiResponse<EmptyResponse>>>
{
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: PostAuthLogoutRequest): Promise<ApiResponse<EmptyResponse>> {
    const { accessToken } = request;
    const { userId } = await this.tokenService.verifyToken(accessToken);
    const auth = await this.authRepository.findOneBy({ userId, accessToken });
    if (!auth) {
      throw new BusinessException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    const update = this.authRepository.create({
      ...auth,
      accessToken: null,
      refreshToken: null,
    });
    this.authRepository.save(update);

    return ApiResponse.success();
  }
}
