// authMiddleware.js

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
  // Check if the token is present in the cookies
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token not found.' })
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach the decoded user object to the request
    req.userId = decoded.userId

    // Check user existence
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' })
    }

    // Proceed to the next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' })
  }
}

const adminMiddleware = async (req, res, next) => {
  // Check if the user is an admin
  const user = await User.findById(req.userId)
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden. You are not an admin.' })
  }
  // Proceed to the next middleware or route handler
  next()
}

module.exports = { authMiddleware, adminMiddleware }
