import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from "express";
import { ErrorResponse } from "../constants/app-constant";

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response ? exception.response.status : 500;
    const message = exception.response.data ?? "An unexpected error occurred";

    response.status(status).json({
      code: "general_error",
      message: message,
    } as ErrorResponse);
  }
}
