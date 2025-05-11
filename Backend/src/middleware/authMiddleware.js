const jwt = require('jsonwebtoken');
require('dotenv').config();


// Middleware to authenticate users
const authenticate = (req, res, next) => {
  let token = req.cookies.accessToken; 

  // If not found in cookies, try Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]; 
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};


module.exports = authenticate;

