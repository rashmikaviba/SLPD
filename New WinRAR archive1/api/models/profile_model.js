import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  published_date: {
    type: Date,
    default: Date.now, // Remove the parentheses here
  },
});

const Profile = model("Profile", ProfileSchema); // Change the model name to "Profile"

export default Profile; // Export the model directly without assigning it to a variable
