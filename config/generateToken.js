const jwt = require("jsonwebtoken")

const generateToken = async (username) => {
    const token = await jwt.sign({username}, process.env.JWT_SECRET)
    return token
}
module.exports = {generateToken}