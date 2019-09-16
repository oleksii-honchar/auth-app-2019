import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { AccessTokenScopes } from 'src/enums';
import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';
import { accessTokenRepository } from "src/repositories";

async function processLogin (req: Request) {
  const logger = getLogger('api/login:post.processLogin()');

  logger.debug('get access-token for user')
  const accessToken = await accessTokenRepository.getForUser(
    req['user'] as User,
    AccessTokenScopes.Login
  );

  return accessToken.get('jwt');
}

async function post (req: Request, res: Response, next: NextFunction) {
  let token: string = '';
  try {
    token = await processLogin(req);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = {
    message: 'Successfully logged in',
    token
  };
  res.statusCode = HttpStatusCodes.OK;
  return next();
}

export const loginHandler = { post };
