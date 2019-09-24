import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';

import pkg from 'package.json';

function get (req: Request, res: Response, next: NextFunction) {
  const packageName = pkg.name || 'not specified';
  const packageVersion = pkg.version || 'not specified';
  res.body = { version: `${packageName}:${packageVersion}` };
  res.statusCode = HttpStatusCodes.OK;
  next();
}

export const versionHandler = { get };
