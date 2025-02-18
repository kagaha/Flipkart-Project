import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
