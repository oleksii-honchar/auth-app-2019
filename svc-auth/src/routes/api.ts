import { Router } from 'express';

import { versionRouter } from './version';
import { registerRouter } from './register';
import { loginRouter } from './login';
import { usersRouter } from './users';

export const apiRouter = Router();

apiRouter.use([
  versionRouter,
  registerRouter,
  loginRouter,
  usersRouter
]);
