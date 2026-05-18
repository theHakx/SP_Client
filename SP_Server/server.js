const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');
require('dotenv').config();

const app = express();

// When behind a proxy (Render, Vercel, etc.) enable trust proxy so secure cookies work
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Hardcoded literal array to bypass any hidden string/whitespace parsing bugs
const allowedOrigins = [
  'https://sp-client-seven.vercel.app',
  'https://sp-client-seven.vercel.app/',
  'http://localhost:5173',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow mobile/server-to-server testing tools (like Postman/Insomnia) where origin is undefined
    // 2. Match strictly against our explicit production and development array whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS Gateway policy'));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error, Abort:', err));

// Check if the DB gateway is breathing
app.get('/', (req, res) => res.send('PoC Gateway API Online'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Gateway running on port ${PORT}`));