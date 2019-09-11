import { Router } from 'express';

import { versionRouter } from './version';
import { registerRouter } from './register';

export const apiRouter = Router();

apiRouter.use([
  versionRouter,
  registerRouter
]);
