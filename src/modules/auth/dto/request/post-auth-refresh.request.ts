import { IsNotBlank } from "src/shared/pipe/is-not-bank.pipe";

export class PostAuthRefreshRequest {
  @IsNotBlank()
  readonly refreshToken: string;
}