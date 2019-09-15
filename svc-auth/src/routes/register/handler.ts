import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import {
  RegisterParamsFromReq,
  RegisterParamsInterface
} from 'src/routes/register/RegisterParamsFromReq';
import { userService } from 'src/services/userService';
import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';

async function processRegistration (req: Request) {
  let user: User | null;
  let params: RegisterParamsInterface;

  const logger = getLogger('api/register:post');

  logger.debug('validating params...')
  params = await new RegisterParamsFromReq(req).validate();

  user = await userService.findUserByEmail(params.email);
  if (user) throw new Error('Already exists');

  logger.debug('creating new one...')
  user = await userService.createUser(params);
}

async function post (req: Request, res: Response, next: NextFunction) {

  try {
    await processRegistration(req);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = 'Successfully created';
  res.statusCode = HttpStatusCodes.CREATED;
  return next();
}

export const registerHandler = { post };
