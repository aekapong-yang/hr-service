import { IsNotBlank } from "src/shared/validator/is-not-bank.validator";

export class PostAuthRefreshRequest {
  @IsNotBlank()
  readonly refreshToken: string;
}