import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
});

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
