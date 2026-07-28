import express from 'express';
import router from './routes/router.js';
import { dbErrorHandler, errorHandler } from './middleware/errorHandlers.js';

const app = express();

app.use(express.json());
app.use('/api', router);

app.use(dbErrorHandler, errorHandler);

export default app;
