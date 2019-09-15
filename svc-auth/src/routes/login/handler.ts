import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';

async function processLogin (req: Request) {
  let user: User | null;

  const logger = getLogger('api/login:post');
  logger.debug('create jwt token')
}

async function post (req: Request, res: Response, next: NextFunction) {
  try {
    await processLogin(req);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = 'Successfully logged in';
  res.statusCode = HttpStatusCodes.OK;
  return next();
}

export const loginHandler = { post };
