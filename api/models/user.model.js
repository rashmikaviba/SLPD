import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  startDate:{
    type: Date,
    require: true,
  },
  endDate:{
    type: Date,
    required: true,
  },
  noOfDays:{
    type: Number,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  vehicleType:{
    type: String,
    required: true,
  },
}, {timeStamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;