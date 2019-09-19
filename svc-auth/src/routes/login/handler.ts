import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { AccessTokenScopes } from 'src/enums';
import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';
import { accessTokenRepository, userRepository } from 'src/repositories';
import { passwordService } from 'src/services';
import { NotFoundError, ValidationError } from 'src/libs/error-classes';
import {
  LoginParamsFromReq,
  LoginParamsInterface,
} from './LoginParamsFromReq';

const logger = getLogger('api/login:post.processLogin()');

async function processLogin (req: Request) {
  logger.debug('validating params...');
  const params: LoginParamsInterface = await new LoginParamsFromReq(req).validate();

  logger.debug('looking for user by email');
  const user: User | null = await userRepository.findUserByEmail(params.email);
  if (!user) throw new NotFoundError('User not found');

  const isPasswordMatch = await passwordService.compare(
    params.password,
    user.get('passwordHash'),
  );

  if (!isPasswordMatch) throw new ValidationError('Wrong password');

  logger.debug('get access-token for user');
  const accessToken = await accessTokenRepository.getForUser(
    user as User,
    AccessTokenScopes.Login,
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
    token,
  };
  res.statusCode = HttpStatusCodes.OK;
  return next();
}

export const loginHandler = { post };
