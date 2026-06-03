import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: 'Location is required.' });
    }

    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).json({ message: 'Weather API key is not configured.' });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: location,
        appid: process.env.WEATHER_API_KEY,
        units: 'metric',
      },
      timeout: 10000,
    });

    return res.json({
      location: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather?.[0]?.description || 'Current conditions unavailable',
      icon: response.data.weather?.[0]?.icon || null,
    });
  } catch (error) {
    const status = error.response?.status === 404 ? 404 : 500;
    return res.status(status).json({
      message:
        status === 404
          ? 'Weather data was not found for this location.'
          : 'Unable to fetch weather right now.',
    });
  }
});

export default router;
