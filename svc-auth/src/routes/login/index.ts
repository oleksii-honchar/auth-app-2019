import { Router } from 'express';
import { loginMiddleware } from 'src/libs/middlewares/';
import { loginHandler } from 'src/routes/login/handler';

export const loginRouter = Router();
loginRouter.post('/login', loginMiddleware, loginHandler.post);
