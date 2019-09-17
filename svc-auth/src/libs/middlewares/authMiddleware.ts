import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as _ from 'lodash';

import {AccessToken,User} from 'src/models';
import {accessTokenRepository,userRepository} from 'src/repositories';
import { jwtService } from 'src/services';
import { getLogger } from '../logger';
import {AccessTokenScopes} from "src/enums";

const logger = getLogger('authMiddleware');

function getTokenFromHeader (req: Request) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
}

export const authMiddleware = async (
  req: Request, res: Response, next: NextFunction
) => {
  logger.debug('get bearer token');
  const encryptedJwt = getTokenFromHeader(req);

  if (!encryptedJwt) {
    const err = new Error('No Bearer token provided');
    err['code'] = HttpStatusCodes.UNAUTHORIZED;
    return next(err);
  }

  logger.debug('check if access-token with this jwt exists');
  const accessToken = await accessTokenRepository.findByJwt(encryptedJwt);

  if (!accessToken) {
    const err = new Error('No access token found. Please login');
    err['code'] = HttpStatusCodes.UNAUTHORIZED;
    return next(err);
  }

  let decryptedJwt: object = {};
  try {
    decryptedJwt = await jwtService.verify(encryptedJwt);
  } catch (err) {
    err['code'] = HttpStatusCodes.UNAUTHORIZED;
    return next(err);
  }

  logger.debug('looking for user by email');
  let user: User | null;
  user = await userRepository.findUserByEmail(_.get(decryptedJwt, 'user.email'));
  if (!user) {
    const err = new Error('User not found');
    err['code'] = HttpStatusCodes.NOT_FOUND;
    return next(err);
  }

  req['user'] = user as User;
  req['jwtToken'] = encryptedJwt;
  next()
};
