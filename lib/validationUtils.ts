import { ValidationError } from 'yup';

// Type for form errors
export type FormErrors = { [key: string]: string };

// Utility function to extract validation errors from Yup
export const extractValidationErrors = (error: unknown): FormErrors => {
  const errors: FormErrors = {};

  if (error instanceof ValidationError) {
    error.inner.forEach((err) => {
      if (err.path) {
        errors[err.path] = err.message;
      }
    });
  }

  return errors;
};

// Utility function to validate form data with a schema
export const validateForm = async <T>(
  schema: any,
  data: T
): Promise<{ isValid: boolean; errors: FormErrors }> => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = extractValidationErrors(error);
    return { isValid: false, errors };
  }
};
