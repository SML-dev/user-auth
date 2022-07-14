import { Router } from 'express';
import {
  loginUser,
  forgotPassword,
  registerUser,
  getPrivateData,
  logout,
  resetPassword,
} from '../controllers/user.controller';
import { authorization, refreshToken } from '../utils/authToken';

export const usersRoute = Router();

usersRoute.post('/register', registerUser);
usersRoute.post('/login', loginUser);
usersRoute.post('/logout', authorization, logout);
usersRoute.post('/forgot-password', forgotPassword);
usersRoute.put('/reset-password/:token', resetPassword);
usersRoute.get('/private', authorization, getPrivateData);
usersRoute.get('/refresh', refreshToken, authorization, getPrivateData);
