#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log(
  '🚀 Setting up environment variables for Amor Meco Restaurant...\n'
);

const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.local.example');

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Skipping creation.');
  console.log('   If you need to update it, please edit it manually.\n');
} else {
  // Create .env.local.example if it doesn't exist
  const envExampleContent = `# Supabase Configuration
# Get these values from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Example:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
`;

  fs.writeFileSync(envExamplePath, envExampleContent);
  console.log('✅ Created .env.local.example');
  console.log(
    '📝 Please copy .env.local.example to .env.local and fill in your Supabase credentials\n'
  );
}

console.log('📋 Next steps:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Copy your project URL and anon key');
console.log('3. Create .env.local file with your credentials');
console.log('4. Run "npm run dev" to start development\n');

console.log('🌐 For deployment:');
console.log('- Set environment variables in your hosting platform');
console.log('- See DEPLOYMENT.md for detailed instructions\n');
