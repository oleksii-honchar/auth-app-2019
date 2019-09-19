import { Router } from 'express';

import { rateLimitMiddleware } from 'src/libs/middlewares';
import { versionRouter } from './version';
import { registerRouter } from './register';
import { loginRouter } from './login';
import { logoutRouter } from './logout';
import { usersRouter } from './users';

export const apiRouter = Router();

apiRouter.use(rateLimitMiddleware, [
  versionRouter,
  registerRouter,
  loginRouter,
  logoutRouter,
  usersRouter,
]);
