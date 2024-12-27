import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError, RawAxiosRequestHeaders } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class OAuthService {
  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(code: string): Promise<TokenInfo> {
    const form = new FormData();
    form.append("client_id", process.env.MS_CLIENT_ID);
    form.append("client_secret", process.env.MS_CLIENT_SECRET);
    form.append("grant_type", process.env.MS_GRANT_TYPE);
    form.append("scope", process.env.MS_SCOPE);
    form.append("code", code);

    const { data } = await firstValueFrom(
      this.httpService
        .post<TokenInfo>(`${process.env.MS_URL}/token`, form)
        .pipe(
          catchError((err: AxiosError) => {
            console.error(err);
            throw err;
          }),
        ),
    );

    return data;
  }

  async getUserProfile(token: string) {
    const headers: RawAxiosRequestHeaders = {
      Authorization: token,
    };

    const { data } = await firstValueFrom(
      this.httpService
        .get<UserProfile>("https://graph.microsoft.com/v1.0/me", { headers })
        .pipe(
          catchError((err: AxiosError) => {
            console.error(err.stack);
            throw err;
          }),
        ),
    );

    return data;
  }
}

interface TokenInfo {
  access_token: string;
}

interface UserProfile {
  displayName: string;
  givenName: string;
  mail: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}
