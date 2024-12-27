import { IsNotBlank } from "src/shared/pipe/is-not-bank.pipe";

export class GetAuthTokenRequest {
  @IsNotBlank()
  readonly code: string;
}
