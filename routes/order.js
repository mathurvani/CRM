const express = require('express')
const orderRouter = express.Router()

orderRouter.get('/', (req,res) => {
    res.json({
        msg : "hi"
    })
})


module.exports = {
    orderRouter
}