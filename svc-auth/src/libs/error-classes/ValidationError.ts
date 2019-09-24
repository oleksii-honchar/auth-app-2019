import HttpStatusCodes from 'http-status-codes';

export class ValidationError extends Error {
  constructor (
    public message: string,
    public errors?: any,
    public code = HttpStatusCodes.BAD_REQUEST,
  ) {
    super(message);
  }
}
