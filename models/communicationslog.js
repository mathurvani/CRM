const mongoose = require("mongoose");
const CommunicationsLogSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    message: { type: String, required: true },
    deliveryStatus: { type: String, enum: ['SENT', 'FAILED','PENDING'], default: 'PENDING' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    audienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment', required: true },
    audienceName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CommunicationsLog", CommunicationsLogSchema);
