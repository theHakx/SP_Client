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

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Local MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error, Abort:', err));

// checking the DB is breathing
app.get('/', (req, res) => res.send('PoC Gateway API Online'));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Gateway running on port ${PORT}`));