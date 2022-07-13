import { Router } from 'express';
import {
  loginUser,
  forgotPassword,
  registerUser,
  getPrivateData,
  logout,
  resetPassword,
} from '../controllers/user.controller';
import { authorization } from '../utils/authToken';

export const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', authorization, logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.put('/reset-password/:token', resetPassword);
userRouter.get('/private', authorization, getPrivateData);
