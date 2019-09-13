import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';

import { RegisterParamsFromReq, RegisterParamsInterface } from 'src/routes/register/RegisterParamsFromReq';
import { userService } from 'src/services/userService';
import { User } from 'src/models';
import { getLogger } from 'src/libs/logger';


async function post (req: Request, res: Response, next: NextFunction) {
  const logger = getLogger('api/register:post');
  let params: RegisterParamsInterface;
  let user: User | null;

  try {
    params = await new RegisterParamsFromReq(req).validate();

    user = await userService.findUserByEmail(params.email);
    if (user) throw new Error('Already exists');

    user = await userService.createUser(params);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = 'Successfully created';
  res.statusCode = HttpStatusCodes.CREATED;
  return next();
}

export const registerHandler = { post };
