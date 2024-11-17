const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type : String, default : "9X7X5X3X10"},
    address: {type : String, default : ""},
    totalSpending: { type: Number, default: 0 },
    lastVisitDate: {type :Date, default : new Date().getDate()},
    visitCount: { type: Number, default: 0 },
    audienceSegments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment' },
    ],
  },
  { timestamps: true }
);
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = {
  Customer,
};
