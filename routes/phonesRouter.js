import { Router } from 'express';
import {
  createPhone,
  deletePhoneById,
  getPhoneById,
  getPhones,
  updateOrCreatePhone,
} from '../constrollers/phoneController.js';
import { paginatePhones } from '../middleware/pagination.js';
import { validatePhoneBody } from '../middleware/validatePhoneBody.js';
import { createPhoneSchema } from '../schemas/index.js';

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(paginatePhones, getPhones)
  .post(validatePhoneBody(createPhoneSchema), createPhone);
phonesRouter
  .route('/:id')
  .get(getPhoneById)
  .put(validatePhoneBody(createPhoneSchema), updateOrCreatePhone)
  .delete(deletePhoneById);

export default phonesRouter;
