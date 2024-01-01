import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email addresses
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
