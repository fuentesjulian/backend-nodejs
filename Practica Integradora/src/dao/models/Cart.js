import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: [{ product: String, quantity: Number }],
});

export default mongoose.model("Cart", cartSchema);
