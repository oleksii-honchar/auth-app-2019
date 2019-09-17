import * as HttpStatusCodes from 'http-status-codes';

export class NotFoundError extends Error {
  constructor (
    public message: string,
    public code = HttpStatusCodes.NOT_FOUND,
  ) {
    super(message);
  }
}
