import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middlewares/error';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // expose compliance info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);
app.use(helmet());

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
}));
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/', routes);

app.use(errorHandler);

export default app;
