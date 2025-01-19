import { HttpStatus } from "@nestjs/common";
import { ApiResponseDto } from "./common.response";

export function apiResponse<T>(statusCode: number, message: string = '', data: T = null): ApiResponseDto<T> {
  if(statusCode === HttpStatus.INTERNAL_SERVER_ERROR) message = 'Internal Server Error'

  return {
    statusCode,
    message,
    data,
  };
}