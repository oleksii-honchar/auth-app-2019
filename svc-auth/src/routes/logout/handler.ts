import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { AccessTokenScopes } from '@src/enums';
import { User } from '@src/models';
import { getLogger } from '@src/libs/logger';
import { accessTokenRepository } from '@src/repositories';

async function processLogout (req: Request) {
  const logger = getLogger('api/login:post.processLogin()');

  logger.debug('delete access-token by jwt');
  await accessTokenRepository.deleteByJwt(req['jwtToken']);
}

async function post (req: Request, res: Response, next: NextFunction) {
  const token: string = '';
  try {
    await processLogout(req);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = {
    message: 'Successfully logged out',
  };
  res.statusCode = HttpStatusCodes.OK;
  return next();
}

export const logoutHandler = { post };
