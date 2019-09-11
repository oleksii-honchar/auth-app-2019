import * as HttpStatusCodes from 'http-status-codes';

export class ValidationError extends Error {
  constructor(public message: string, public errors: any, public code = HttpStatusCodes.BAD_REQUEST) {
    super();
  }
}

export class MapperError extends Error {
  constructor(public message: string, public error: any, public code = HttpStatusCodes.BAD_REQUEST) {
    super();
  }
}

export class ApiError extends Error {
  public error: any;
  public code: number;

  constructor(public message: string, { code, error }: any) {
    super();

    this.error = error;
    this.code = code;
  }
}

export class NotFoundError extends Error {
  constructor(public code = HttpStatusCodes.NOT_FOUND) {
    super();
  }
}

export class UnauthorizedError extends Error {
  constructor(public message: string, public code = HttpStatusCodes.UNAUTHORIZED) {
    super();
  }
}
