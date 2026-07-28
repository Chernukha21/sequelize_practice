import { Router } from 'express';
import phonesRouter from './phonesRouter.js';

const router = Router();

router.use('/phones', phonesRouter);

export default router;
