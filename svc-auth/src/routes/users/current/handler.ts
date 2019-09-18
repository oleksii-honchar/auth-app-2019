import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

async function get (req: Request, res: Response, next: NextFunction) {
  res.body = req['user'];
  res.statusCode = HttpStatusCodes.OK;
  return next();
}

export const currentUserHandler = { get };
