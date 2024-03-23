// authMiddleware.js

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
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

    // Proceed to the next middleware or route handler
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' })
  }
}

module.exports = authMiddleware
