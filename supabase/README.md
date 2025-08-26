# Supabase Integration for Amor Meco Restaurant

This directory contains the Supabase configuration and edge functions for the Amor Meco Restaurant website.

## 🚀 Quick Setup

### 1. Install Supabase CLI

```bash
# Using npm
npm install -g supabase

# Using Homebrew (macOS)
brew install supabase/tap/supabase
```

### 2. Initialize Supabase Project

```bash
# Login to Supabase
supabase login

# Initialize the project (if not already done)
supabase init

# Start local development
supabase start
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# For local development
# SUPABASE_URL=http://localhost:54321
# SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

### 4. Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy contact-form
```

## 📁 Directory Structure

```
supabase/
├── config.toml              # Supabase configuration
├── functions/
│   └── contact-form/        # Contact form edge function
│       ├── index.ts         # Main function code
│       └── package.json     # Function dependencies
├── migrations/
│   └── 20240101000000_create_contact_submissions_table.sql
└── README.md               # This file
```

## 🔧 Edge Functions

### Contact Form Function

**Endpoint**: `/functions/v1/contact-form`

**Method**: POST

**Purpose**: Handles contact form submissions from the website

**Features**:

- ✅ Input validation and sanitization
- ✅ Database storage with RLS policies
- ✅ CORS support
- ✅ Error handling
- ✅ Email notification support (configurable)

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Reservation Inquiry",
  "message": "I would like to make a reservation..."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "uuid-of-submission"
}
```

## 🗄️ Database Schema

### contact_messages Table

| Column     | Type        | Description                  |
| ---------- | ----------- | ---------------------------- |
| id         | UUID        | Primary key                  |
| name       | TEXT        | Contact name                 |
| email      | TEXT        | Contact email                |
| phone      | TEXT        | Contact phone (optional)     |
| subject    | TEXT        | Message subject (optional)   |
| message    | TEXT        | Message content              |
| read       | BOOLEAN     | Read status (default: false) |
| created_at | TIMESTAMPTZ | Record creation time         |
| ip_address | INET        | Client IP address            |
| user_agent | TEXT        | Client user agent            |

## 🔒 Security Features

### Row Level Security (RLS)

- ✅ Insert allowed for all users (anonymous + authenticated)
- ✅ Read/Update/Delete only for authenticated users (admin access)

### Input Validation

- ✅ Required field validation
- ✅ Email format validation
- ✅ Input length limits
- ✅ SQL injection prevention
- ✅ XSS prevention

### CORS Configuration

- ✅ Proper CORS headers
- ✅ Preflight request handling

## 📧 Email Integration

The edge function includes a placeholder for email notifications. To enable email sending:

1. **Using SendGrid**:

   ```typescript
   // In the edge function
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(Deno.env.get('SENDGRID_API_KEY'));
   ```

2. **Using Resend**:
   ```typescript
   // In the edge function
   const { Resend } = require('resend');
   const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
   ```

## 🧪 Testing

### Local Testing

```bash
# Start local Supabase
supabase start

# Test the function locally
curl -X POST http://localhost:54321/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### Production Testing

```bash
# Deploy to production
supabase functions deploy contact-form --project-ref your-project-ref

# Test production function
curl -X POST https://your-project-ref.supabase.co/functions/v1/contact-form \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## 🔄 Development Workflow

1. **Local Development**:

   ```bash
   supabase start
   npm run dev
   ```

2. **Database Changes**:

   ```bash
   # Create new migration
   supabase migration new your_migration_name

   # Apply migrations
   supabase db reset
   ```

3. **Function Updates**:
   ```bash
   # Deploy function changes
   supabase functions deploy contact-form
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Function not found**: Ensure the function is deployed
2. **CORS errors**: Check CORS headers in the function
3. **Database connection**: Verify environment variables
4. **RLS policies**: Check database policies are applied

### Debug Mode

```bash
# Start with debug logging
supabase start --debug

# View function logs
supabase functions logs contact-form
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Database RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Support](https://supabase.com/docs/guides/functions/typescript-support)
