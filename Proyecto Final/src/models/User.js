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
  password: { type: String },
  img: String,
  role: {
    type: String,
    default: "user",
  },
  carts: [{ type: mongoose.Types.ObjectId, ref: "carts" }],
});

export default mongoose.model("User", userSchema);
