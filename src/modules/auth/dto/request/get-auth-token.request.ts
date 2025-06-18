import { IsNotBlank } from "src/shared/decorator/is-not-bank.decorator";

export class GetAuthTokenRequest {
  @IsNotBlank()
  readonly code: string;
}
