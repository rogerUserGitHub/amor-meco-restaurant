# Validation System

This directory contains the centralized validation system using Yup for form validation.

## Files

- `validations.ts` - Contains all Yup validation schemas
- `validationUtils.ts` - Utility functions for handling validation errors
- `README.md` - This documentation

## Usage

### 1. Import the validation schema

```typescript
import { contactFormSchema, ContactFormData } from '../lib/validations';
import { extractValidationErrors, FormErrors } from '../lib/validationUtils';
```

### 2. Set up form state with TypeScript types

```typescript
const [formData, setFormData] = useState<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const [errors, setErrors] = useState<FormErrors>({});
const [isSubmitting, setIsSubmitting] = useState(false);
```

### 3. Handle form submission with validation

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrors({});

  try {
    // Validate form data
    await contactFormSchema.validate(formData, { abortEarly: false });

    // Handle successful submission
    console.log('Form submitted:', formData);

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (validationErrors) {
    const newErrors = extractValidationErrors(validationErrors);
    setErrors(newErrors);
  } finally {
    setIsSubmitting(false);
  }
};
```

### 4. Display validation errors in your form

```typescript
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  className={`w-full px-4 py-3 border rounded-lg ${
    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
  }`}
/>;
{
  errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>;
}
```

## Available Schemas

- `contactFormSchema` - Contact form validation
- `reservationFormSchema` - Reservation form validation (for future use)
- `newsletterSchema` - Newsletter subscription validation
- `emailSchema` - Generic email validation
- `nameSchema` - Generic name validation

## Benefits

1. **Centralized**: All validation logic in one place
2. **Reusable**: Schemas can be used across multiple components
3. **Type-safe**: Full TypeScript support with inferred types
4. **Maintainable**: Easy to update validation rules
5. **Consistent**: Same validation behavior across the app
