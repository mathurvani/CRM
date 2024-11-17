const mongoose = require("mongoose");

const AudienceSegmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: {type : String, default : ""},
    conditions: { type: Object, required: true }, // Store complex query as JSON
  },
  { timestamps: true }
);

const AudienceSegment = mongoose.model(
  "AudienceSegment",
  AudienceSegmentSchema
);

module.exports = AudienceSegment;
