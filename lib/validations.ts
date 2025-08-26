import * as yup from 'yup';

// Security patterns to prevent injection attacks
const SECURITY_PATTERNS = {
  // Allow letters, spaces, hyphens, apostrophes for names
  NAME_PATTERN: /^[a-zA-ZÀ-ÿ\s\-']+$/,
  // Allow letters, numbers, spaces, common punctuation for subjects
  SUBJECT_PATTERN: /^[a-zA-Z0-9À-ÿ\s\-'.,!?()]+$/,
  // Allow letters, numbers, spaces, common punctuation for messages
  MESSAGE_PATTERN: /^[a-zA-Z0-9À-ÿ\s\-'.,!?()@#$%&*+=<>[\]{}|\\/:;]+$/,
  // Phone number pattern (international format)
  PHONE_PATTERN: /^[\+]?[1-9][\d\s\-\(\)]{0,20}$/,
  // Prevent common SQL injection patterns
  SQL_INJECTION_PATTERN:
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT|ONLOAD|ONERROR|ONCLICK)\b)|(['";\\])/i,
  // Prevent XSS patterns
  XSS_PATTERN:
    /<script|javascript:|vbscript:|onload=|onerror=|onclick=|<iframe|<object|<embed/i,
};

// Function to create validation schema with translated messages
export const createContactFormSchema = (t: (key: string) => string) =>
  yup.object({
    name: yup
      .string()
      .required(t('validation.name.required'))
      .min(2, t('validation.name.min'))
      .max(50, t('validation.name.max'))
      .matches(SECURITY_PATTERNS.NAME_PATTERN, t('validation.name.pattern'))
      .test('no-sql-injection', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
      })
      .test('no-xss', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
      })
      .trim(),

    email: yup
      .string()
      .required(t('validation.email.required'))
      .email(t('validation.email.invalid'))
      .max(254, t('validation.email.max'))
      .test('no-sql-injection', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
      })
      .test('no-xss', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
      })
      .trim()
      .lowercase(),

    phone: yup
      .string()
      .optional()
      .test('phone-format', t('validation.phone.invalid'), (value) => {
        if (!value || value.trim() === '') return true; // Allow empty values
        return SECURITY_PATTERNS.PHONE_PATTERN.test(value);
      })
      .test('no-sql-injection', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
      })
      .trim(),

    subject: yup
      .string()
      .required(t('validation.subject.required'))
      .min(5, t('validation.subject.min'))
      .max(100, t('validation.subject.max'))
      .matches(
        SECURITY_PATTERNS.SUBJECT_PATTERN,
        t('validation.subject.invalid')
      )
      .test('no-sql-injection', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
      })
      .test('no-xss', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
      })
      .trim(),

    message: yup
      .string()
      .required(t('validation.message.required'))
      .min(10, t('validation.message.min'))
      .max(1000, t('validation.message.max'))
      .matches(
        SECURITY_PATTERNS.MESSAGE_PATTERN,
        t('validation.message.invalid')
      )
      .test('no-sql-injection', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
      })
      .test('no-xss', t('validation.security.invalid'), (value) => {
        if (!value) return true;
        return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
      })
      .trim(),
  });

// Legacy schema for backward compatibility (uses English messages)
export const contactFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(
      SECURITY_PATTERNS.NAME_PATTERN,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim()
    .lowercase(),

  phone: yup
    .string()
    .optional()
    .test('phone-format', 'Please enter a valid phone number', (value) => {
      if (!value || value.trim() === '') return true; // Allow empty values
      return SECURITY_PATTERNS.PHONE_PATTERN.test(value);
    })
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .trim(),

  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .matches(
      SECURITY_PATTERNS.SUBJECT_PATTERN,
      'Subject contains invalid characters'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),

  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .matches(
      SECURITY_PATTERNS.MESSAGE_PATTERN,
      'Message contains invalid characters'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),
});

// Reservation form validation schema (for future use)
export const reservationFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(
      SECURITY_PATTERNS.NAME_PATTERN,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim()
    .lowercase(),

  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[\+]?[1-9][\d\s\-\(\)]{0,20}$/,
      'Please enter a valid phone number'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .trim(),

  date: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past'),

  time: yup
    .string()
    .required('Time is required')
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Please enter a valid time (HH:MM)'
    ),

  guests: yup
    .number()
    .required('Number of guests is required')
    .min(1, 'Minimum 1 guest')
    .max(20, 'Maximum 20 guests')
    .integer('Number of guests must be a whole number'),

  specialRequests: yup
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .matches(
      SECURITY_PATTERNS.MESSAGE_PATTERN,
      'Special requests contain invalid characters'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),
});

// Newsletter subscription validation schema (for future use)
export const newsletterSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim()
    .lowercase(),
});

// Generic email validation
export const emailSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim()
    .lowercase(),
});

// Generic name validation
export const nameSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(
      SECURITY_PATTERNS.NAME_PATTERN,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .test('no-sql-injection', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.SQL_INJECTION_PATTERN.test(value);
    })
    .test('no-xss', 'Invalid characters detected', (value) => {
      if (!value) return true;
      return !SECURITY_PATTERNS.XSS_PATTERN.test(value);
    })
    .trim(),
});

// Export types for TypeScript
export type ContactFormData = yup.InferType<typeof contactFormSchema>;
export type ReservationFormData = yup.InferType<typeof reservationFormSchema>;
export type NewsletterFormData = yup.InferType<typeof newsletterSchema>;
