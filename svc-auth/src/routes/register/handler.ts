import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { RegisterParamsFromReq } from 'src/routes/register/RegisterParamsFromReq';
import { userService } from 'src/services';
import { SendMailOptions } from 'nodemailer';
import { User } from 'src/models';
import { CONFIG_MAILER_ACTIVATION_EMAIL_SUBJECT, CONFIG_MAILER_FROM, CONFIG_USER_SEND_EMAIL_ACTIVATION } from 'src/constants';
import { mailService } from 'src/services/mailService';
import { templateService } from 'src/services/templateService';
import { getLogger } from 'src/libs/logger';
import { accessTokenService } from 'src/services/accessTokenService';
import { AccessTokenScopes } from 'src/enums/AccessTokenScopes';
import { RegisterParamsInterface } from './RegisterParamsFromReq';

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

  if (!CONFIG_USER_SEND_EMAIL_ACTIVATION) {
    logger.warn('Activation email send skipped');

    res.body = 'Successfully created';
    res.statusCode = HttpStatusCodes.CREATED;
    return next();
  }

  try {
    const accessToken = await accessTokenService.getForUser(
      user,
      AccessTokenScopes.EmailValidation,
    );
    const token = accessToken.get('jwt');
    const activationUrl = `${process.env.WA_BASE_URL}/api/activate-email?token=${token}`;
    const mail: SendMailOptions = {
      from: CONFIG_MAILER_FROM,
      to: params.email,
      subject: CONFIG_MAILER_ACTIVATION_EMAIL_SUBJECT,
      html: await templateService.compile('email-activation', {
        activationUrl,
        firstName: params.firstName,
        lastName: params.lastName,
      }),
    };

    await mailService.send(mail);
  } catch (e) {
    e.code = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    return next(e);
  }

  res.body = 'Successfully created';
  res.statusCode = HttpStatusCodes.CREATED;
  next();
}

export const registerHandler = { post };
