import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import placeRoutes from './routes/places.js';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Smart Travel Recommendation System API is running.',
    frontend: 'http://127.0.0.1:5173',
    health: '/api/health',
    routes: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      places: 'GET /api/places?region=North&budget=Low',
      weather: 'GET /api/weather?location=Rishikesh',
    },
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Smart Travel Recommendation System' });
});

app.use('/api/auth', authRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/weather', weatherRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_uri') {
      throw new Error('Set MONGO_URI in backend/.env before starting the backend.');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'tourism',
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Backend startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
