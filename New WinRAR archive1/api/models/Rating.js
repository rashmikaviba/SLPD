import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  ratingId: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String },
  driverId: { type: String, required: true },
  driverName: { type: String },
  tripId: { type: String }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
