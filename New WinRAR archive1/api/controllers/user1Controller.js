import User from '../models/User1.js';

export const createUser = async (req, res) => {
  try {
    const { name, age, nic } = req.body;
    const user = new User({ name, age, nic });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
