import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import mongoose from 'mongoose';

export const checkUsernameAvailability = async (req, res, next) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    next(errorHandler(500, 'Failed to check username availability.'));
  }
};

export const signup = async (req, res, next) => {
  const { userName, name, email, startDate, endDate, noOfDays, location, vehicleType, estBudget } = req.body;

  if (!userName || !name || !email || !startDate || !endDate || !noOfDays || !location || !vehicleType || userName === '' || name === '' || email === '' || startDate === '' || endDate === '' || noOfDays === '' || location === '' || vehicleType === '' || estBudget === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    let existingUser = await User.findOne({ userName });

    if (existingUser) {
      return next(errorHandler(400, 'User with this username already exists.'));
    }

    const newUser = new User({
      tripId: new mongoose.Types.ObjectId(), // Generate tripId using ObjectID
      userName,
      name,
      email,
      startDate,
      endDate,
      noOfDays,
      location,
      vehicleType,
      estBudget,
      available: true // Set trip as available by default
    });

    await newUser.save(); // Save user

    res.json({ tripId: newUser.tripId }); // Send tripId in the response
  } catch (error) {
    console.log('Error:', error); // Log error
    return next(errorHandler(500, 'Failed to create trip. Please try again.'));
  }
};

export const updateTrip = async (req, res, next) => {
  const userName = req.params.userName;
  const { startDate, endDate, noOfDays, location, vehicleType, estBudget } = req.body;

  try {
    const updatedTrip = await User.findOneAndUpdate(
      { userName },
      { startDate, endDate, noOfDays, location, vehicleType, estBudget },
      { new: true }
    );
    res.json(updatedTrip);
  } catch (error) {
    next(errorHandler(500, 'Failed to update trip. Please try again.'));
  }
};

export const getTripByUsername = async (req, res, next) => {
  const userName = req.params.userName;

  try {
    const trip = await User.findOne({ userName });
    res.json(trip);
  } catch (error) {
    next(errorHandler(404, 'Trip not found.'));
  }
};

export const getTripByKey = async (req, res, next) => {
  const key = req.params.key;
  const value = req.params.value;

  try {
    let trip;
    if (key === 'username') {
      trip = await User.findOne({ userName: value });
    } else if (key === 'tripid') {
      trip = await User.findOne({ tripId: value });
    } else {
      return next(errorHandler(400, 'Invalid search key.'));
    }

    if (!trip) {
      return next(errorHandler(404, 'Trip not found.'));
    }

    res.json(trip);
  } catch (error) {
    next(errorHandler(500, 'Failed to fetch trip details.'));
  }
};

export const deleteTripByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
    const deletedTrip = await User.findOneAndDelete({ userName: username });
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const markTripAsComplete = async (req, res, next) => {
  const tripId = req.params.id;

  try {
    const updatedTrip = await User.findByIdAndUpdate(tripId , { isCompleted: true }, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    next(errorHandler(500, 'Failed to mark trip as completed. Please try again.'));
  }
};

export const deleteTripById = async (req, res, next) => {
  const tripId = req.params.id;

  try {
    const deletedTrip = await User.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error("Error deleting trip:", error);
    next(errorHandler(500, 'Failed to delete trip. Please try again.'));
  }
};

export const getAllTrips = async (req, res, next) => {
  try {
    const trips = await User.find({});
    res.json(trips);
  } catch (error) {
    next(errorHandler(500, 'Failed to fetch trips.'));
  }
};
