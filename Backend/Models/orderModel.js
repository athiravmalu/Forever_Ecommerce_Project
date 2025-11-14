// Backend/Models/orderModel.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        img: { type: [String], required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        size: { type: String },
      },
    ],
    shippingAddress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
