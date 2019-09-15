import { Router } from 'express';

import { versionRouter } from './version';
import { registerRouter } from './register';
import { loginRouter } from './login';

export const apiRouter = Router();

apiRouter.use([
  versionRouter,
  registerRouter,
  loginRouter,
]);
