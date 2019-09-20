import { Router } from 'express';
import { authMiddleware } from '@src/libs/middlewares';

import { logoutHandler } from './handler';

export const logoutRouter = Router();
logoutRouter.post('/logout', authMiddleware, logoutHandler.post);
