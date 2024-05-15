import Rating from '../models/Rating.js';

export const addRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editRating = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRating = await Rating.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    await Rating.findByIdAndDelete(id);
    res.status(200).json({ message: 'Rating deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findOne({ ratingId: id }); // Use ratingId field instead of _id
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




