import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorCode } from "src/shared/constants/error-code.constant";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { BusinessException } from "src/shared/exception/business.exception";
import { Auth } from "src/shared/model/auth.entity";
import { TokenService } from "src/shared/provider/token.service";
import { EmptyResponse } from "src/shared/types/empty-response";
import { Repository } from "typeorm";
import { PostAuthLogoutRequest } from "../dto/request/post-auth-logout.request";

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
