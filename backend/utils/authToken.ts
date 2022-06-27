import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = '2b328988-28b7-40b1-ba7f-90aa6c678e0e';

export const authToken = (id: string): string => {
  return jwt.sign({ id }, secret, {
    expiresIn: '10min',
  });
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, secret);
    // @todo create type

    return next();
  } catch {
    return res.sendStatus(403);
  }
};
