import { Router } from 'express';
import { authUser, registerUser } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', authUser);
