import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import { userRouter } from './routes/user.routes';
import { handleError } from './utils/error';
import './utils/db';

const PORT = Number(process.env.PORT) || 5000;

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
    credentials: true,
  }),
);
app.use('/api', userRouter);
app.use(handleError);
app.listen(PORT, 'localhost', () => console.log('server starting on http://localhost:5000'));
