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
    expiresIn: '60min',
  });
};

export const authorization = (req: RequestWithUserId, res: Response, next: NextFunction) => {
  const token: string = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }
  jwt.verify(token, secret, (err, payload: PayloadData) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    req.userId = payload.id;
    return next();
  });
};
