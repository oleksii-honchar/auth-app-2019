import { Router } from 'express';
import { authMiddleware } from 'src/libs/middlewares';
import { currentUserHandler } from './handler';

export const currentUserRouter = Router();
currentUserRouter.get('/current', authMiddleware, currentUserHandler.get);
