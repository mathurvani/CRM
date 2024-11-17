const CommunicationsLog = require('../models/communicationslog');
const {Customer} = require('../models/customer');

exports.createLog = async (req, res) => {
  // Logic to create a new communications log entry
};

exports.getLogs = async (req, res) => {
  // Logic to get all logs or with filters
};

exports.updateLogStatus = async (req, res) => {
  // Logic to update the status of a log entry
};

exports.updateDeliveryStatus = async (req, res) => {
  // Logic to update delivery status (90% SENT, 10% FAILED)
};




exports.saveAudienceData = async (req, res) => {
  try {
    const { audienceId, message } = req.body;

    // Retrieve customers for the audience
    const customers = await Customer.find({ audienceSegments: { $in: [audienceId] } });
    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: 'No customers found for this audience.' });
    }

    // Save communications log for each customer
    const logs = customers.map((customer) => ({
      audienceId,
      audienceName: 'Your Audience Name', // Replace with actual name
      message: `Hi ${customer.firstName}, ${message}`,
      recipient: customer._id,
    }));

    await CommunicationsLog.insertMany(logs);

    res.status(201).json({ message: 'Communications log saved successfully.', logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deliveryReceipt = async (req, res) => {
  try {
    const { logId, deliveryStatus } = req.body;

    // Update the delivery status in the database
    const updatedLog = await CommunicationsLog.findByIdAndUpdate(
      logId,
      { deliveryStatus },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: 'Log entry not found.' });
    }

    res.status(200).json({ message: 'Delivery status updated.', updatedLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAllCommunicationLogs = async (req, res) => {
  try {
    // Extract filters and sorting options from query parameters
    const { audienceId, campaignId, deliveryStatus, sortBy, sortOrder = 'asc', page = 1, limit = 10 } = req.query;

    const filter = {};

    // Apply filters
    if (audienceId) filter.audienceId = audienceId;
    if (campaignId) filter.campaign = campaignId;
    if (deliveryStatus) filter.deliveryStatus = deliveryStatus;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch communication logs with filters and sorting
    const logs = await CommunicationsLog.find(filter)
      .populate('campaign', 'name') // Replace 'name' with fields to populate
      .populate('recipient', 'firstName lastName email') // Replace with recipient details to populate
      .populate('audienceId', 'name') // Populate audience details
      .sort({ [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Fetch total count for pagination
    const totalLogs = await CommunicationsLog.countDocuments(filter);

    res.status(200).json({
      message: 'Communication logs retrieved successfully.',
      logs,
      pagination: {
        totalLogs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalLogs / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.sendMessages = async (req, res) => {
  try {

    const pendingLogs = await CommunicationsLog.find({ deliveryStatus: 'PENDING' });

    if (!pendingLogs || pendingLogs.length === 0) {
      return res.status(404).json({ message: 'No messages to send.' });
    }
    console.log("pemding",pendingLogs)

    for (const log of pendingLogs) {
      
      console.log(`Sending message to ${log.recipient}: ${log.message}`);

      
      const isSent = Math.random() < 0.9;
      const deliveryStatus = isSent ? 'SENT' : 'FAILED';

      // Call the Delivery Receipt API
      await deliveryReceipt(log._id, deliveryStatus);
    }
    res.status(200).json({ message: 'Messages processed.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deliveryReceipt = async (logId, deliveryStatus) => {
  try {
    const response = await fetch(
      'http://localhost:4000/api/v1/communication/deliveryReceipt',
      {
        method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logId: logId, // Replace with your selected audience ID
              deliveryStatus: deliveryStatus, // Use the message input value
            }),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update delivery receipt for log ${logId}:`, error.message);
    throw error;
  }
};