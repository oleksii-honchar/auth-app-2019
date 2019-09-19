import * as HttpStatusCodes from 'http-status-codes';

export class MapperError extends Error {
  constructor (
    public message: string, public error: any, public code = HttpStatusCodes.BAD_REQUEST,
  ) {
    super();
  }
}
