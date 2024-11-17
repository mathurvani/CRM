const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
};
