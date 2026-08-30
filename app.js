import express from 'express';
import router from './routes/router.js';
import { dbErrorHandler, errorHandler } from './middleware/errorHandlers.js';
import { CONSTANTS } from './constants.js';
import cors from 'cors';

const corsOptions = {
  origin: '*',
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use('/static', express.static(CONSTANTS.STATIC_PATH));
app.use(dbErrorHandler, errorHandler);

export default app;
