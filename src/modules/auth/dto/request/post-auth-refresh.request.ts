import { IsNotBlank } from "src/shared/decorator/is-not-bank.decorator";

export class PostAuthRefreshRequest {
  @IsNotBlank()
  readonly refreshToken: string;
}