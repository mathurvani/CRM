const express = require('express');
const { saveAudienceData ,deliveryReceipt,getAllCommunicationLogs,sendMessages} = require('../controllers/commLogController');
const communicationRouter = express.Router()

communicationRouter.post('/saveAudienceData', saveAudienceData);
communicationRouter.post('/deliveryReceipt', deliveryReceipt);
communicationRouter.post('/alllogs', getAllCommunicationLogs);
communicationRouter.get('/send', sendMessages);

module.exports={
    communicationRouter
}