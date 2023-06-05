import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  user: String,
  message: String,
});

export default mongoose.model("Messages", cartSchema);
