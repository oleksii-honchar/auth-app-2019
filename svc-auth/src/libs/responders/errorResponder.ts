import omit from 'lodash/omit';
import { AssertionError } from 'assert';
import { Request, Response, NextFunction, Application } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { is } from 'src/libs/is';

import { getLogger } from '../logger';

const logger = getLogger('APP-SVC[err]');

function default404Handler(req: Request, res: Response, next: NextFunction) {
  res.statusCode = res.statusCode || HttpStatusCodes.NOT_FOUND;

  if (res.statusCode === HttpStatusCodes.NOT_FOUND) {
    const message = `[${res.statusCode}] Not found: ${req.method} ${req.originalUrl}`;
    res.body = res.body || { error: message };

    const error = new Error(message);
    error['code'] = res.statusCode;
    logger.warn({ error });
  }
  next();
}

function assertionErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let error = err;
  const isAssertionError = error instanceof AssertionError;

  if (is.falsy(isAssertionError)) {
    return next(error);
  }

  if (process.env.NODE_ENV === 'production') {
    error = omit(error, 'stack');
  }

  error.code = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  res.statusCode = error.code;
  res.body = error;

  if (err.code === HttpStatusCodes.INTERNAL_SERVER_ERROR) {
    logger.error({ error });
  } else {
    logger.warn({ error });
  }

  return next();
}

function defaultHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const error = err;
  error.code = error.code || HttpStatusCodes.INTERNAL_SERVER_ERROR;

  if (
    error['code'] === HttpStatusCodes.INTERNAL_SERVER_ERROR ||
    error['code'] === 'ETIMEDOUT'
  ) {
    logger.error({ error });
    logger.error(error.stack);
  } else {
    logger.warn({ error });
  }

  res.statusCode = error.code;
  res.body = error.message;
  next();
}

function tooBusyErrHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error.code === HttpStatusCodes.SERVICE_UNAVAILABLE) {
    logger.error({ error });
    res.statusCode = error.code;
    res.body = error.message;
    next();
  } else {
    next(error);
  }
}

function use(app: Application) {
  app.use(default404Handler);
  app.use(tooBusyErrHandler);
  app.use(assertionErrorHandler);
  app.use(defaultHandler);
}

export const errorResponder = { use };
