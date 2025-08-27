# Deployment Guide

## Environment Variables

To deploy this application, you need to set the following environment variables:

### Supabase Configuration

1. **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL

   - Format: `https://your-project-id.supabase.co`
   - Get this from your Supabase project dashboard

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anonymous key
   - Format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Get this from your Supabase project dashboard under Settings > API

## Netlify Deployment

1. Connect your repository to Netlify
2. Set the build command to: `npm run build`
3. Set the publish directory to: `.next`
4. Add the environment variables in Netlify's dashboard:
   - Go to Site settings > Environment variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Vercel Deployment

1. Connect your repository to Vercel
2. Add the environment variables in Vercel's dashboard:
   - Go to Project settings > Environment variables
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Local Development

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials
3. Run `npm run dev`

## Troubleshooting

If you encounter "supabaseUrl is required" errors:

1. Check that environment variables are properly set
2. Ensure the variables start with `NEXT_PUBLIC_`
3. Verify the values are correct in your Supabase dashboard
