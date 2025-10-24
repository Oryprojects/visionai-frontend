const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build process...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the application
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Ensure dist directory exists and has proper structure
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Build output directory not found');
  }

  // Check if index.html exists
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    throw new Error('index.html not found in build output');
  }

  console.log('Build completed successfully!');
  console.log('Build output:', fs.readdirSync(distDir));
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
