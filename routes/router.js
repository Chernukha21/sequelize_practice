import { Router } from 'express';
import phonesRouter from './phonesRouter.js';
import preordersRouter from './preordersRouter.js';

const router = Router();

router.use('/phones', phonesRouter);
router.use('/preorders', preordersRouter);

export default router;
