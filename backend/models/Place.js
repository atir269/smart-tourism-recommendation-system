import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      enum: ['North', 'South', 'East', 'West'],
    },
    budget: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

placeSchema.index({ region: 1, budget: 1 });

export default mongoose.model('Place', placeSchema);
