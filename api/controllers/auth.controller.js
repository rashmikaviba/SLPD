import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res, next) => {
  const { userName, name, email, startDate, endDate, noOfDays, location, vehicleType } = req.body;

  if (!userName || !name || !email || !startDate || !endDate || !noOfDays || !location || !vehicleType || userName === ''|| name === '' || email === '' || startDate === '' || endDate === '' || noOfDays === '' || location === '' || vehicleType === ''){
    next(errorHandler(400,'All fields are required'));
  }

  const newUser = new User({
    userName,
    name,
    email,
    startDate,
    endDate,
    noOfDays,
    location,
    vehicleType

  }); 

  try {

    await newUser.save();
    res.json('Signup successful');
  } 
  catch (error){
    next(error);
  }
};

// Update trip
export const updateTrip = async (req, res, next) => {
  const userName = req.params.userName;
  const { startDate, endDate, noOfDays, location, vehicleType } = req.body;

  try {
    const updatedTrip = await User.findOneAndUpdate(
      { userName },
      { startDate, endDate, noOfDays, location, vehicleType },
      { new: true }
    );
    res.json(updatedTrip);
  } catch (error) {
    next(errorHandler(500, 'Failed to update trip. Please try again.'));
  }
};

// Get trip by username
export const getTripByUsername = async (req, res, next) => {
  const userName = req.params.userName;

  try {
    const trip = await User.findOne({ userName });
    res.json(trip);
  } catch (error) {
    next(errorHandler(404, 'Trip not found.'));
  }
};

// Delete trip by username
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