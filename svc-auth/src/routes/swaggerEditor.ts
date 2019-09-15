import { Router, static as serveStatic } from 'express';
import * as path from 'path';
import * as HttpStatusCodes from 'http-status-codes';

import { is } from 'src/libs/is';
import { STATIC_ASSETS_PATH } from 'src/constants';

export const swaggerEditorRouter = Router();

swaggerEditorRouter.all('/swagger.json', (req, res, next) => {
  const filePath = path.join(STATIC_ASSETS_PATH, '../swagger.json');
  res.sendFile(filePath);
  return next();
});

const editorPath = path.join(STATIC_ASSETS_PATH, 'swagger-editor');
swaggerEditorRouter.use('/', serveStatic(editorPath), (req, res, next) => {
  if (is.nullOrUndefined(req.route)) {
    res.statusCode = HttpStatusCodes.NOT_FOUND;
  }

  return next();
});
