import { IsNotBlank } from "src/shared/pipe/is-not-bank.pipe";

export class PostAuthLogoutRequest {
  @IsNotBlank()
  readonly accessToken: string;
}