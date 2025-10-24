import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Import routes
import contactRoutes from './routes/contact.js';
import careerRoutes from './routes/careers.js';

// ES Module setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// CORS configuration - allow dynamic origin for Vercel preview/prod
app.use(cors({ origin: true, credentials: true }));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure upload directories exist (local dev only)
let uploadsRoot;
if (!process.env.VERCEL) {
  uploadsRoot = path.join(__dirname, 'uploads');
  const resumesDir = path.join(uploadsRoot, 'resumes');
  if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });
  if (!fs.existsSync(resumesDir)) fs.mkdirSync(resumesDir, { recursive: true });
  app.use('/uploads', express.static(uploadsRoot));
} else {
  // Vercel serverless: uploads are not persistent
  console.warn('Uploads are not supported on Vercel serverless functions.');
}

// File upload middleware
let upload;
if (!process.env.VERCEL) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsRoot);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /pdf|doc|docx/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
      }
    }
  });
} else {
  // Disable upload middleware on Vercel
  upload = (req, res, next) => {
    res.status(501).json({ message: 'File uploads are not supported on Vercel serverless functions.' });
  };
}

// MongoDB connection - require MONGODB_URI from environment for production.
// Avoid hard-coded credentials in source.
const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
} else {
  console.warn('MONGODB_URI is not set. Skipping MongoDB connection.');
}

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'production' ? {} : error.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;