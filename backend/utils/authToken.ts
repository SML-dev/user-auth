import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const authToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn: '60min',
  });
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403);
  }
  try {
    const data = jwt.verify(token, secret);
    // @ts-ignore
    req.userId = data.id;
    return next();
  } catch {
    return res.status(403);
  }
};
