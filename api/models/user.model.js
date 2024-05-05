import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  noOfDays: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  estBudget: {
    type: Number,
    required: true
  },
  isCompleted: {
     type: Boolean, 
     default: false 
    }
});

const User = mongoose.model('User', userSchema);

export default User;
