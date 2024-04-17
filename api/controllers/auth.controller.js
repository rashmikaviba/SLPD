import User from '../models/user.model.js';

export const signup = async (req,res) => {
  const { userName, name, email, startDate, endDate, noOfDays, location, vehicleType } = req.body;

  if (!userName || !name || !email || !startDate || !endDate || !noOfDays || !location || !vehicleType || userName === ''|| name === '' || email === '' || startDate === '' || endDate === '' || noOfDays === '' || location === '' || vehicleType === ''){
    return res.status(400).json({ message: 'All fields are required'});
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
    res.status(500).json({message: error.message});
  }
};