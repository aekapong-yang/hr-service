import { IsNotBlank } from "src/shared/validator/is-not-bank.validator";

export class GetAuthTokenRequest {
  @IsNotBlank()
  readonly code: string;
}
