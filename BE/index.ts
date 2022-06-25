import express, { json } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { userRouter } from './routes/user.routes';

const app = express();
app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  }),
);
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use('/api', userRouter);

app.listen(5000, 'localhost', () => console.log('server starting on http://localhost:5000'));
