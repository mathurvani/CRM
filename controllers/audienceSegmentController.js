const AudienceSegment = require('../models/audiencesegment');
const {Customer} = require("../models/customer");

exports.createSegment = async (req, res) => {
  try {
    const { name, description, conditions } = req.body; // Changed from req.query to req.body
    if (!name || !conditions) {
      return res.status(400).json({ message: 'Name and conditions are required' });
    }
    const newSegment = new AudienceSegment({
      name,
      description,
      conditions
    });
    await newSegment.save();
    const query = {};
    for (const [field, condition] of Object.entries(conditions)) {
      const operator = Object.keys(condition)[0]; // Get the operator, e.g., "$gt"
      const value = condition[operator];

        switch (operator) {
            case'$gt':
                query[field] = { $gt: value };
                break;
            case'>':
                query[field] = { $gt: value };
                break;
            case "$lt":
                query[field] = { $lt: value };
                break;
                case "<":
                  query[field] = { $lt: value };
                  break;
            case "$eq":
                query[field] = value;
                break;
                case "=":
                  query[field] = value;
                  break;
            case "$gte":
                query[field] = { $gte: value };
                break;
                case ">=":
                  query[field] = { $gte: value };
                  break;
            case "$lte":
                query[field] = { $lte: value };
                break;
                case "<=":
                  query[field] = { $lte: value };
                  break;
            case "$ne":
                query[field] = { $ne: value };
                break;
                case "!=":
                  query[field] = { $ne: value };
                  break;
            default:
                return res.status(400).json({ message: `Invalid operator: ${operator}` });
        }
    }

    // Fetch customers based on the constructed query
    const customers = await Customer.find(query);
    const customerIds = customers.map((customer) => customer._id);
    await Customer.updateMany(
      { _id: { $in: customerIds } },
      { $push: { audienceSegments: newSegment._id } }
    );

    res.status(201).json({ message: 'Segment created successfully', segment: newSegment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating segment', error: error.message });
  }
};


exports.getSegments = async (req, res) => {
  try {
    const segments = await AudienceSegment.find();
    res.status(200).json(segments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching segments', error: error.message });
  }
};

exports.getSegmentById = async (req, res) => {
  // Logic to get a single segment by ID
};

exports.updateSegment = async (req, res) => {
   // Logic to update a segment
};

exports.deleteSegment = async (req, res) => {
  // Logic to delete a segment
};

exports.calculateSegmentSize = async (req, res) => {
  try {
    const { segmentId } = req.params;
    const segment = await AudienceSegment.findById(segmentId);
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found' });
    }
    // Use the segment's conditions to query the Customer collection
    const count = await Customer.countDocuments(segment.conditions);
    res.status(200).json({ segmentId, size: count });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating segment size', error: error.message });
  }
};

// function buildQueryFromConditions(conditions) {
//   const query = {};

//   conditions.forEach(({ field, operator, value }) => {
//       switch (operator) {
//           case '>':
//               query[field] = { $gt: value };
//               break;
//           case '<':
//               query[field] = { $lt: value };
//               break;
//           case '=':
//               query[field] = value;
//               break;
//           case '>=':
//               query[field] = { $gte: value };
//               break;
//           case '<=':
//               query[field] = { $lte: value };
//               break;
//           case '!=':
//               query[field] = { $ne: value };
//               break;
//           default:
//               throw new Error(`Unsupported operator: ${operator}`);
//       }
//   });

//   return query;
// }