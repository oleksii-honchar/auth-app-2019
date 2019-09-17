import { Router } from 'express';
import { loginHandler } from './handler';

export const loginRouter = Router();
loginRouter.post('/login', loginHandler.post);
