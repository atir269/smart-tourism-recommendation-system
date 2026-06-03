import express from 'express';
import Place from '../models/Place.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { region, budget } = req.query;
    const query = {};

    if (region) query.region = region;
    if (budget) query.budget = budget;

    const places = await Place.find(query).sort({ name: 1 });
    return res.json(places);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Unable to fetch recommendations.',
    });
  }
});

export default router;
