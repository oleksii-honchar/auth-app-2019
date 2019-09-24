import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import { userRepository } from '@src/repositories';
import { User } from '@src/models';
import { getLogger } from '@src/libs/logger';
import {
  RegisterParamsFromReq,
  RegisterParamsInterface,
} from './RegisterParamsFromReq';

const logger = getLogger('api/register:post');

async function processRegistration (req: Request) {
  logger.debug('validating params...');
  const params: RegisterParamsInterface = await
  new RegisterParamsFromReq(req).validate();

  const user: User | null = await userRepository.findUserByEmail(params.email);
  if (user) throw new Error('Already exists');

  logger.debug('creating new one...');
  await userRepository.createUser(params);
}

async function post (req: Request, res: Response, next: NextFunction) {
  try {
    await processRegistration(req);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = { message: 'Successfully created' };
  res.statusCode = HttpStatusCodes.CREATED;
  return next();
}

export const registerHandler = { post };
