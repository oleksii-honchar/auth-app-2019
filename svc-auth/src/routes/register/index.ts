import { Router } from 'express';

import { registerHandler } from './handler';

export const registerRouter = Router();

registerRouter.post('/register', registerHandler.post);
