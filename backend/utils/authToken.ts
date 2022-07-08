import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const authToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60min',
  });
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ msg: 'User not authenticated' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    // @ts-ignore
    req.userId = payload.id;
    return next();
  });
};
