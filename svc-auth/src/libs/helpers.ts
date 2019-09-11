import { Request, Response, NextFunction } from 'express';
import * as HttpStatusCodes from 'http-status-codes';

import { NotFoundError } from './errorClasses';

type LogError = (error?: NodeJS.ErrnoException | Error) => null | void;

export function handleRoute(handler: Function, logError: LogError = () => null) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.body = await handler(req);
      res.statusCode = HttpStatusCodes.OK;
    } catch (error) {
      logError(error);
      res.body = error;
      res.statusCode = error.code || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }

    next();
  };
}

/**
 * Express route handler wrapper
 */
export function routeHandler(resolve: Function, logError: LogError) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.body = await resolve(req);
      res.statusCode = HttpStatusCodes.OK;
    } catch (error) {
      logError(error);
      res.body = error;
      res.statusCode = error instanceof NotFoundError ? error.code : HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }

    next();
  };
}
