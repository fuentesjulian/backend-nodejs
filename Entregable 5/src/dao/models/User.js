import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: { type: String, required: true },
  img: String,
  role: {
    type: String,
    default: "usuario",
  },
});

export default mongoose.model("User", userSchema);
