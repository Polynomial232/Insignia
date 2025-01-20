export class ApiResponseDto<T> {
  statusCode: number;
  pagination: Pagination;
  message: string;
  data: T;
}

export class Validator {
  status: boolean;
  statusCode: number;
  message: string;
}

export class Pagination {
  page: number = 0;
  totalPage: number = 0;
}