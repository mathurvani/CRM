const express = require('express')
const {createCampaign,getAllCampaigns,getCampaignById} = require('../controllers/campaignController')
const campaignRouter = express.Router()

campaignRouter.post("/createcampaigns", createCampaign); // To create a new campaign
campaignRouter.get("/allcampaigns", getAllCampaigns); // To get all campaigns
campaignRouter.get("/campaigns/:id", getCampaignById);


module.exports = {
    campaignRouter
}