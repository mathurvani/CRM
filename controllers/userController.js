const User = require('../models/user');
const z = require("zod");
const jwt = require("jsonwebtoken")
const { generateToken } = require( '../config/generateToken');
const { parseUser, parseLoginDetails } = require('../middlewares/inputValidation');
const bcrypt = require("bcrypt")

exports.googleAuth = async (req, res) => {
  // Logic to handle Google authentication
};

exports.login = async (req, res) => {

  const {email, password} = req.body

  const userExists = await User.findOne({
    email
  })
  if(!userExists){
    res.status(404).json({
      MSG : "User with this email doesn't exist!"
    })
  }
  // console.log(usesrExists)
  // const parsedDetails = parseLoginDetails({
  //   email,
  //   password
  // })
  // if(!parsedDetails.success) {
  //   res.json({
  //     message : "Inputs Invalidated"
  //   })
  // }
  const checkPassword = bcrypt.compare(password, userExists.password)
  if(!checkPassword){
    res.status(404).json({
      msg : "Invalid Password"
    })
  }
  const token = await generateToken(email)
  userExists.token = token
  res.json({ message: 'Login successful',
    token
  });
};

exports.signup = async (req, res) => {
  // Logic for signing up a user manually
  console.log("reached auth")
  const {firstName, lastName, email, password} = req.body;
  if(!email || !password || !firstName){
    return res.status(403).json({
        success:false,
        message:"Fill all the details"
    })
}
  try{
    const existinguser = await User.findOne({
      email,
    })
    if(existinguser){
      return res.status(403).json({
          success: false,
          message: "USER ALREADY REGISTERED"
      })
  }
    const hashedPwd = await bcrypt.hash(password, 10)
    const userSignUp = await User.create({
      firstName,
      lastName,
      email,
      password : hashedPwd
    })
    return res.status(200).json({
      success:true,
      message:"Sign up done",
      token
  })
  }
 
  // const token = await generateToken(email)

  // res.cookie('authToken', token, { httpOnly: true });
  // if(userSignUp){
  //   res.json({"status" : "successful sign up",
  //   })
  // }}
  catch(e) {
    console.error(e)
    res.status(500).json("Internal Error Occured")
  }
};
exports.logout = async (req, res) => {
  // Logic to log out a user
  res.clearCookie('authToken');
  // redirect to login page / signup page
  res.json({ message: 'Logout successful' });
};


exports.getData = async (req,res) => {
  const fullToken = req.headers.authorization
  const token = fullToken.split(' ')[1]
  try{const verifiedJWT = await jwt.verify(token, process.env.JWT_SECRET)
  const username = verifiedJWT.username;
  const findUser = await User.findOne({
    email : username
  }).select('email firstName lastName')
  return res.json({
    user:findUser,
    firstName : findUser.firstName,
    lastName : findUser.lastName,
  })}
  catch(e) {
    console.error(e)
    res.status(500).json({
      message : "Internval Server Error"
    })
  }
}