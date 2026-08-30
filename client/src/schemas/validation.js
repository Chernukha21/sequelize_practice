import * as Yup from 'yup';

export const validationSchema = Yup.object({
  brand: Yup.string().required('Choose a brand'),
  model: Yup.string().required('Enter a model'),
  productionYear: Yup.number()
    .min(2000, 'Year should be earlier than 2000')
    .max(new Date().getFullYear(), 'Year should be in future')
    .required('Enter a year of production'),
  ramSize: Yup.string().required('Choose a ramSize'),
  processor: Yup.string().required('Enter a processor'),
  screenDiagonal: Yup.number()
    .positive('Should be positive integer')
    .required('Enter a screenDiagonal'),
  color: Yup.string().required('Choose a color'),
  phoneImage: Yup.mixed(),
});
