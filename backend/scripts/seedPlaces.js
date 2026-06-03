import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Place from '../models/Place.js';
import { places } from '../data/places.js';

dotenv.config();

const seedPlaces = async () => {
  try {
    if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_uri') {
      throw new Error('Set MONGO_URI in backend/.env before running the seed script.');
    }

    await mongoose.connect(process.env.MONGO_URI, { dbName: 'tourism' });
    await Place.deleteMany({});
    await Place.insertMany(places, { ordered: true });

    console.log(`Seeded ${places.length} places into tourism.places`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seed failed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedPlaces();
