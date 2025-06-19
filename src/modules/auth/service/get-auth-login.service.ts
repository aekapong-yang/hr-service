import { Injectable } from "@nestjs/common";
import { ApiResponse } from "src/shared/dto/api-response.dto";
import { GetAuthTokenResponse } from "../dto/response/get-auth-token-response";

@Injectable()
export class GetAuthLoginService {
  constructor() {}

  execute(): ApiResponse<GetAuthTokenResponse> {
    const AUTH_PARAMS: URLSearchParams = new URLSearchParams({
      client_id: process.env.MS_CLIENT_ID,
      redirect_url: process.env.MS_REDIRECT_URL,
      response_type: process.env.MS_RESPONSE_TYPE,
      response_mode: process.env.MS_RESPONSE_MODE,
      scope: process.env.MS_SCOPE,
    });

    return ApiResponse.success({ url: `${process.env.MS_URL}/authorize?${AUTH_PARAMS}` });
  }
}
