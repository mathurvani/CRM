const express = require('express')
const userRouter = express.Router()
const { customerRouter } = require('./customer')
const {signup, login, logout, getData} = require("../controllers/userController")
const {authenticate} = require("../config/authenticate")
userRouter.get('/', (req,res) => {
    res.json({
        msg : "hi"
    })
})
userRouter.use('/customer', customerRouter)
userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/getdata', getData)
// example 
//  down below
userRouter.get('/protected', authenticate, (req, res) => {
    res.json({ message: `Hello, ${req.user}! This is a protected route.` });
});
module.exports = {
    userRouter
}