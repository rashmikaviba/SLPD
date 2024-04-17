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