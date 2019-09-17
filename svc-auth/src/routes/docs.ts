import { Router, static as serveStatic } from 'express';
import * as path from 'path';
import * as HttpStatusCodes from 'http-status-codes';
import * as fs from 'fs';

import { getLogger } from 'src/libs/logger';
import { is } from 'src/libs/is';
import { STATIC_ASSETS_PATH } from '../constants';

export const docsRouter = Router();
const logger = getLogger('/docs');

docsRouter.all('/swagger.json', (req, res, next) => {
  const filePath = path.join(STATIC_ASSETS_PATH, 'swagger.json');
  logger.debug(`docs json: ${filePath}`);

  if (fs.existsSync(filePath)) {
    logger.debug(`file exists`);
  } else {
    logger.warn(`file DOESN\'T exists`);
  }

  res.statusCode = HttpStatusCodes.OK;
  res.sendFile(filePath);
});

const docsPath = path.join(STATIC_ASSETS_PATH, 'docs');
docsRouter.use('/', serveStatic(docsPath), (req, res, next) => {
  if (is.nullOrUndefined(req.route)) {
    res.statusCode = HttpStatusCodes.NOT_FOUND;
  }

  return next();
});
