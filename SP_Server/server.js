const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
require('dotenv').config();

const app = express();

// 1. Proxy configuration must run first for secure cloud cookies
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// 2. Manual Custom CORS Middleware (Bypasses the 'cors' package entirely)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Normalize by removing trailing slashes from all origins
    const normalizedOrigin = origin ? origin.replace(/\/+$/, '') : null;
    const allowedOrigins = [
      'https://sp-client-seven.vercel.app',
      'http://localhost:5173',
      'http://localhost:5000'
    ];
    
    // If the browser origin is in our whitelist, mirror it back explicitly
    if (normalizedOrigin && (allowedOrigins.includes(normalizedOrigin) || normalizedOrigin.startsWith('http://localhost'))) {
      res.setHeader('Access-Control-Allow-Origin', normalizedOrigin);
    }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Instantly intercept and approve browser pre-flight OPTIONS handshakes
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 3. Standard parsing middlewares
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error, Abort:', err));

// Core Gateway Health Check
app.get('/', (req, res) => res.send('PoC Gateway API Online'));

// Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Gateway running on port ${PORT}`));