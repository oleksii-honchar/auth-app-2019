import { Router, Request, Response, NextFunction } from 'express';
import url from 'url';
import path from 'path';
import HttpStatusCodes from 'http-status-codes';

import { is } from 'src/libs/is';
import { apiRouter } from './api';
import { docsRouter } from './docs';
import { faviconRouter } from './favicon';
import { swaggerEditorRouter } from './swaggerEditor';

const mountPoint = process.env.SVC_MOUNT_POINT!;
export const router = Router();

router.use(faviconRouter);
router.use(mountPoint, [
  apiRouter,
  (req: Request, res: Response, next: NextFunction) => {
    if (is.nullOrUndefined(req.route)) {
      res.statusCode = HttpStatusCodes.NOT_FOUND;
    }

    return next();
  }
]);

if (['stage', 'production'].indexOf(process.env.ENV_NAME!) < 0) {
  router.use('/docs', docsRouter);
  router.use('/swagger-editor', swaggerEditorRouter);
}

router.use('*', (req, res, next) => {
  if (
    req.route ||
    res.statusCode === HttpStatusCodes.NOT_FOUND ||
    res.statusCode === HttpStatusCodes.INTERNAL_SERVER_ERROR
  ) {
    return next();
  }

  if (path.extname(url.parse(req.originalUrl).pathname!)) {
    res.statusCode = HttpStatusCodes.NOT_FOUND;
    return next();
  }

  return next();
});
