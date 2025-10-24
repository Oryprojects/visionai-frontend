#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Build the application
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify build output
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('❌ Build output directory not found');
  }

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('❌ index.html not found in build output');
  }

  console.log('✅ Build completed successfully!');
  console.log('📁 Build output:', fs.readdirSync(distDir));
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}