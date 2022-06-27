import express, { json, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user.routes';
import { handleError } from './utils/error';

const app = express();
app.use(json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use('/api', userRouter);

app.use(handleError);

app.listen(5000, 'localhost', () => console.log('server starting on http://localhost:5000'));
