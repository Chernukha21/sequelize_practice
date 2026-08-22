import { Router } from 'express';
const preordersRouter = Router();
import { getPreorders } from '../constrollers/preordersController.js';

preordersRouter.get('/', getPreorders);

export default preordersRouter;
