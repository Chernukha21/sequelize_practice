import * as yup from 'yup';

export const createPhoneSchema = yup.object({
  model: yup.string().trim().required().min(1).max(100),
  brand: yup.string().trim().required().min(2).max(50),
  productionYear: yup
    .number()
    .integer()
    .required()
    .min(2000)
    .max(new Date().getFullYear()),
  ramSize: yup.number().integer().required().min(1),
  processor: yup.string().trim().required(),
  screenDiagonal: yup.number().required().min(1),
  hasNfc: yup.boolean().default(false),
});
