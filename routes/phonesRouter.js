import { Router } from 'express';
import {
  createPhone,
  deletePhoneById,
  getPhoneById,
  getPhones,
  updateOrCreatePhone,
  updatePhoneById,
  uploadPhoneImage,
} from '../constrollers/phoneController.js';
import { paginatePhones } from '../middleware/pagination.js';
import { validatePhoneBody } from '../middleware/validatePhoneBody.js';
import { createPhoneSchema } from '../schemas/index.js';
import {
  createPreorder,
  getPhonePreorders,
} from '../constrollers/preordersController.js';
import { uploadPhonePhoto } from '../middleware/upload.js';

const phonesRouter = Router();

phonesRouter
  .route('/')
  .get(paginatePhones, getPhones)
  .post(uploadPhonePhoto, validatePhoneBody(createPhoneSchema), createPhone);
phonesRouter
  .route('/:id')
  .get(getPhoneById)
  .patch(updatePhoneById)
  .put(validatePhoneBody(createPhoneSchema), updateOrCreatePhone)
  .delete(deletePhoneById);
phonesRouter.get('/:id/preorders', getPhonePreorders);
phonesRouter.post('/:id/preorders', createPreorder);
phonesRouter.patch('/:id/images', uploadPhonePhoto, uploadPhoneImage);

export default phonesRouter;
