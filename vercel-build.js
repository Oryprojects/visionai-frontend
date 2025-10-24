const { execSync } = require('child_process');

console.log('Starting Vercel build process...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the application
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
