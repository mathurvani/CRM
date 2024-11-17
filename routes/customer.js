const express = require("express")
const {createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer,getCustomersByAudience} = require('../controllers/customerController')
const customerRouter = express.Router();

customerRouter.post('/create', createCustomer)
customerRouter.get('/retrieve', getCustomers)
customerRouter.get('/retrievebyid', getCustomerById)
customerRouter.put('/update', updateCustomer)
customerRouter.delete('/delete', deleteCustomer)
customerRouter.get('/retrieveSegment/:id', getCustomersByAudience)

module.exports = {
    customerRouter
}