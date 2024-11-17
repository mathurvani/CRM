const jwt = require("jsonwebtoken")
const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.username;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = {
    authenticate
}