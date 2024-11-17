const {Campaign} = require('../models/campaign');
const AudienceSegment = require('../models/audiencesegment');
exports.createCampaign = async (req, res) => {
  try {
    const { name, description, startDate, endDate, audienceSegment } = req.body;

    // Validate the audienceSegments
    if (!audienceSegment) {
      return res.status(400).json({ message: "Audience Segment is required." });
    }

    // Validate the audienceSegment ObjectId
    const segment = await AudienceSegment.findById(audienceSegment);
    if (!segment) {
      return res.status(404).json({ message: "Audience Segment not found." });
    }

    const newCampaign = new Campaign({
      name,
      description,
      startDate,
      endDate,
      audienceSegment,
    });

    await newCampaign.save();
    return res.status(201).json(newCampaign);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("audienceSegment");
    return res.status(200).json(campaigns);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate("audienceSegments");
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    return res.status(200).json(campaign);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCampaign = async (req, res) => {
  // Logic to update a campaign
};

exports.deleteCampaign = async (req, res) => {
  // Logic to delete a campaign
};

exports.sendCampaign = async (req, res) => {
  // Logic to send a campaign to its audience
};