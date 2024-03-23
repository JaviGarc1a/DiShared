/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 * /login:
 *   post:
 *     summary: Authenticate user
 *     description: Login with username and password to access restricted routes
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Sucess messagee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token.
 *       '401':
 *         description: Unauthorized. Invalid username or password.
 */

const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    // Find user by email
    const user = await User.findOne({ username })

    // If user not found or password does not match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    // Send token in response and set it in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    // Login successful message
    res.json({ message: 'Login successful' })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
