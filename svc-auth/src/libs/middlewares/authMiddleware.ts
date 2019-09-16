import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';
import * as _ from 'lodash';

import { User } from 'src/models';
import { userRepository } from 'src/repositories';
import { jwtService } from 'src/services';
import { getLogger } from '../logger';

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
  const encryptedToken = getTokenFromHeader(req);

  if (!encryptedToken) {
    const err = new Error('No Bearer token provided');
    err['code'] = HttpStatusCodes.UNAUTHORIZED;
    return next(err);
  }

  let decryptedToken: object = {};
  try {
    decryptedToken = await jwtService.verify(encryptedToken);
  } catch (err) {
    err['code'] = HttpStatusCodes.UNAUTHORIZED;
    return next(err);
  }

  logger.debug('looking for user by email');
  let user: User | null;
  user = await userRepository.findUserByEmail(_.get(decryptedToken, 'user.email'));
  if (!user) {
    const err = new Error('User not found');
    err['code'] = HttpStatusCodes.NOT_FOUND;
    return next(err);
  }

  req['user']= user as User;
  next()
};
