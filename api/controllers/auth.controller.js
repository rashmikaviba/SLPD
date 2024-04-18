import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const adddetails = async (req, res, next) => {
  const { driverId, name, date, description, paymentId, amount } = req.body;

  if (
    !driverId ||
    !name ||
    !date ||
    !description ||
    !paymentId ||
    !amount ||
    driverId === '' ||
    name === '' ||
    date === '' ||
    description === '' ||
    paymentId === '' ||
    amount === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  // Convert date string to date object
  const [day, month, year] = date.split("/");
  const dateObject = new Date(year, month - 1, day);

  try {
    const newUser = new User({
      driverId,
      name,
      date: dateObject, // Use the converted date object
      description,
      paymentId,
      amount,
    });

    await newUser.save();
    res.json('Payment successful');
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      next(error);
    } else {
      // Handle other errors
      console.error(error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  }
};
