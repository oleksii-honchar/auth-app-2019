export class ApiError extends Error {
  public error: any;

  public code: number;

  constructor (public message: string, { code, error }: any) {
    super();

    this.error = error;
    this.code = code;
  }
}
