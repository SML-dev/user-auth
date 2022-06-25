import express, { json } from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

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
app.use(json);
// app.get('/api', (req, res) => {
//   res.send('ok');
// });

app.listen(3001, 'localhost', () => console.log('server starting on http://localhost:3001/api'));
