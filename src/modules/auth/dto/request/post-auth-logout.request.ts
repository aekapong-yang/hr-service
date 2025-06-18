import { IsNotBlank } from "src/shared/decorator/is-not-bank.decorator";

export class PostAuthLogoutRequest {
  @IsNotBlank()
  readonly accessToken: string;
}