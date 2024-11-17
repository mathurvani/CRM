const express = require("express")
const {createSegment,getSegments} = require("../controllers/audienceSegmentController")
const segmentRouter = express.Router();

segmentRouter.post('/createsegment',createSegment)
segmentRouter.get('/allsegments',getSegments)

module.exports = {
    segmentRouter
}