const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    audienceSegment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudienceSegment",
      required: true,
    },
    startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
    messageTemplate: { type: String},
  },
  { timestamps: true }
);
const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = {
  Campaign
};
