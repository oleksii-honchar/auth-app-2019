import { Router } from 'express';

import { currentUserRouter } from './current';

export const usersRouter = Router();

usersRouter.use('/users', [currentUserRouter]);
