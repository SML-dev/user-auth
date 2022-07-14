import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUserId } from '../controllers/user.controller';

const secret = process.env.JWT_SECRET;

interface PayloadData {
  id: string;
  iat: number;
  exp: number;
}

export const authToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn: '35s',
  });
};

export const authorization = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const token: string = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ msg: 'Cannot find token' });
  }
  jwt.verify(token, secret, (err, payload: PayloadData) => {
    if (err) {
      return res.status(403).json('Authentication failed');
    }
    req.userId = payload.id;
    return next();
  });
};

export const refreshToken = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const prevToken: string = req.cookies.access_token;
  if (!prevToken) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }
  jwt.verify(prevToken, secret, (err, user: PayloadData) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    res.clearCookie('access_token').cookie('access_token', '');
    const token = authToken(user.id);
    res.cookie('access_token', token, {
      httpOnly: true,
      // I had to add 2h,30s because of wrong timeZone in my node :(
      // In correct version should be 30000
      maxAge: 7230000,
    });
    req.userId = user.id;
    next();
  });
};
