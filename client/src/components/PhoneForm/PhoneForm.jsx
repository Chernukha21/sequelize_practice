import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from '../../schemas/validation.js';
import { useCreatePhoneMutation } from '../../store/phonesApi.js';
import classes from './PhoneForm.module.scss';
import LinkButton from '../LinkButton/LinkButton.jsx';

const initialValues = {
  model: '',
  brand: '',
  productionYear: '',
  ramSize: '',
  processor: '',
  screenDiagonal: '',
  hasNfc: false,
  color: '',
  phoneImage: null,
};

export const PhoneForm = () => {
  const [createPhone, { isLoading: isCreating, error: createError }] =
    useCreatePhoneMutation();

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData();

    formData.append('model', values.model);
    formData.append('brand', values.brand);
    formData.append('productionYear', values.productionYear);
    formData.append('ramSize', values.ramSize);
    formData.append('processor', values.processor);
    formData.append('screenDiagonal', values.screenDiagonal);
    formData.append('hasNfc', String(values.hasNfc));
    formData.append('color', values.color);

    if (values.phoneImage) {
      formData.append('phoneImage', values.phoneImage);
    }

    console.log('FORM DATA:', [...formData.entries()]);

    try {
      const createdPhone = await createPhone(formData).unwrap();

      console.log('CREATED PHONE:', createdPhone);

      resetForm();
    } catch (error) {
      console.error('CREATE PHONE ERROR:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={classes['form-container']}>
      <nav className={classes.navigation}>
        <LinkButton to="/" content="back" />
      </nav>
      <div className={classes['form-card']}>
        <h2 className={classes['form-title']}>Phone description</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className={classes['device-form']}>
              <div className={classes['form-row']}>
                <div className={classes['form-group']}>
                  <label htmlFor="brand">Бренд</label>

                  <Field
                    id="brand"
                    name="brand"
                    type="text"
                    placeholder="Apple, Samsung, Xiaomi..."
                  />

                  <ErrorMessage
                    name="brand"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>

                <div className={classes['form-group']}>
                  <label htmlFor="model">Модель</label>

                  <Field
                    id="model"
                    name="model"
                    type="text"
                    placeholder="iPhone 15, Galaxy S24..."
                  />

                  <ErrorMessage
                    name="model"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>
              </div>

              <div className={classes['form-row']}>
                <div className={classes['form-group']}>
                  <label htmlFor="productionYear">Year of production</label>

                  <Field
                    id="productionYear"
                    name="productionYear"
                    type="number"
                    placeholder="2024"
                  />

                  <ErrorMessage
                    name="productionYear"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>

                <div className={classes['form-group']}>
                  <label htmlFor="processor">CPU</label>

                  <Field
                    id="processor"
                    name="processor"
                    type="text"
                    placeholder="Snapdragon, Apple M-series..."
                  />

                  <ErrorMessage
                    name="processor"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>
              </div>

              <div className={classes['form-row']}>
                <div className={classes['form-group']}>
                  <label htmlFor="ramSize">RAM size</label>

                  <Field id="ramSize" name="ramSize" as="select">
                    <option value="" disabled hidden>
                      choose
                    </option>
                    <option value="4">4 gb</option>
                    <option value="8">8 gb</option>
                    <option value="16">16 gb</option>
                    <option value="32">32 gb</option>
                  </Field>

                  <ErrorMessage
                    name="ramSize"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>

                <div className={classes['form-group']}>
                  <label htmlFor="screenDiagonal">Screen size</label>

                  <Field
                    id="screenDiagonal"
                    name="screenDiagonal"
                    type="number"
                    step="0.1"
                    placeholder="6.1"
                  />

                  <ErrorMessage
                    name="screenDiagonal"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>
              </div>

              <div
                className={`${classes['form-row']} ${classes['alignment-fix']}`}
              >
                <div className={classes['form-group']}>
                  <label htmlFor="color">Color</label>

                  <Field
                    id="color"
                    name="color"
                    type="text"
                    placeholder="space grey"
                  />

                  <ErrorMessage
                    name="color"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>
                <div
                  className={`${classes['form-group']} ${
                    classes['checkbox-group']
                  }`}
                >
                  <label className={classes['checkbox-label']}>
                    <Field name="hasNfc" type="checkbox" />
                    <span className={classes['custom-checkbox']} />
                    support NFC
                  </label>
                </div>
              </div>
              <div
                className={`${classes['form-row']} ${classes['alignment-fix']}`}
              >
                <div className={classes['form-group']}>
                  <span className={classes['file-label-text']}>Photo:</span>

                  <label
                    htmlFor="phoneImage"
                    className={classes['file-upload-btn']}
                  >
                    <span>
                      {values.phoneImage ? 'Change photo' : 'Choose file'}
                    </span>

                    <input
                      id="phoneImage"
                      type="file"
                      name="phoneImage"
                      accept="image/jpeg,image/png,image/gif"
                      className={classes['hidden-file-input']}
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];

                        setFieldValue('phoneImage', file ?? null);
                      }}
                    />
                  </label>

                  {values.phoneImage && (
                    <span className={classes['file-name']}>
                      📋 {values.phoneImage.name}
                    </span>
                  )}

                  <ErrorMessage
                    name="phoneImage"
                    component="span"
                    className={classes['error-msg']}
                  />
                </div>
              </div>

              {createError && (
                <p className={classes['server-error']}>
                  {createError.data?.message ?? 'Failed to create device'}
                </p>
              )}
              <button
                type="submit"
                className={`${classes['submit-btn']} ${isSubmitting ? classes['loading'] : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={classes['spinner']}></span>
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save device'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PhoneForm;
