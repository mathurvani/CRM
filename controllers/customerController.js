const {Customer} = require("../models/customer");
const AudienceSegment = require('../models/audiencesegment');

exports.createCustomer = async (req, res) => {
  // Logic to create a new customer
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    totalSpending,
    lastVisitDate,
    visitCount,
  } = req.body;
  try {
    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      address,
      totalSpending,
      lastVisitDate,
      visitCount,
    });
    customer.save().then(() => {
      console.log("New Customer Created");
    });
    res.status(200).json({
      Message: "Customer successfully created",
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      Message: "Error creating the customer",
    });
  }
};

exports.getCustomers = async (req, res) => {
  // Logic to get all customers or with filter
  try {
    const customers = await Customer.find({
    })
    res.status(200).json({
      message:"Customers Fetched",
      Customers : customers
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      Error : "Error retrieving customers"
    })
  }
};

exports.getCustomerById = async (req, res) => {
  // Logic to get a single customer by ID
  const {id} = req.query
  try {
    const customer = await Customer.findById(id)
    res.status(200).json({
      customer
    })
  }
  catch(err) {
    console.error(err)
    res.json({
      error : "Error retrieving the customer by id"
    })
  }
};

exports.updateCustomer = async (req, res) => {
  // Logic to update a customer
  const {id } = req.query

  try {const status = await Customer.updateOne({_id : id}, { $set : {
    firstName : "Reemas",
    lastName : "Niaj"
  }})
  res.json({
    status : status.acknowledged
  })}
  catch(er) {
    console.error(er)
    res.status(404).json({
      msg : "Error updating the customer"
    })
  }
};

exports.deleteCustomer = async (req, res) => {
  // Logic to delete a customer using id ?
  const {id} = req.query 

  try {
    const delStatus = await Customer.deleteOne({
      _id : id
    })
    res.status(200).json({
      status : "Successfully deleted the customer"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status : "Couldn't delete the customer"
    })
  }

};

exports.getCustomersByAudience = async (req, res) => {
  try {
      const { id } = req.params;
      const audience = await AudienceSegment.findById(id);
      console.log("Audience Data:", audience);

      if (!audience) {
          return res.status(404).json({ message: "Audience not found" });
      }

      const conditions = audience.conditions;  // This is an object, not an array.
      const query = {};

      // Iterate over the object keys
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

      return res.status(200).json(customers);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
};

