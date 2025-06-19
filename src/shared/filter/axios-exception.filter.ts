import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { AxiosError } from "axios";
import { Response } from "express";
import { Code } from "../constants/enum-constant";
import { ErrorResponse } from "../types/types";

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response ? exception.response.status : 500;
    const message = exception.response.data ?? "An unexpected error occurred";

    response.status(status).json({
      code: Code.GENERAL_ERROR,
      message: message,
    } as ErrorResponse);
  }
}
