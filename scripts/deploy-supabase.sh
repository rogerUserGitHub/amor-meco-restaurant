#!/bin/bash

# Supabase Deployment Script for Amor Meco Restaurant
# This script deploys the Supabase edge functions and database migrations

set -e  # Exit on any error

echo "🚀 Starting Supabase deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    print_error "Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    echo "or"
    echo "brew install supabase/tap/supabase"
    exit 1
fi

# Check if user is logged in
if ! supabase status &> /dev/null; then
    print_warning "You are not logged in to Supabase. Please run:"
    echo "supabase login"
    exit 1
fi

# Check if project is linked
if [ ! -f "supabase/config.toml" ]; then
    print_error "Supabase config not found. Please run:"
    echo "supabase init"
    exit 1
fi

# Deploy database migrations
print_status "Deploying database migrations..."
supabase db push

# Deploy edge functions
print_status "Deploying edge functions..."
supabase functions deploy contact-form

# Verify deployment
print_status "Verifying deployment..."
supabase functions list

print_status "Deployment completed successfully! 🎉"

echo ""
echo "📋 Next steps:"
echo "1. Set up your environment variables in .env.local"
echo "2. Test the contact form function"
echo "3. Configure email notifications if needed"
echo ""
echo "🔗 Useful commands:"
echo "- View function logs: supabase functions logs contact-form"
echo "- Start local development: supabase start"
echo "- Reset database: supabase db reset"
