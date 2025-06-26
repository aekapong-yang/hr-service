import { IsNotBlank } from "src/shared/validator/is-not-bank.validator";

export class PostAuthLogoutRequest {
  @IsNotBlank()
  readonly accessToken: string;
}