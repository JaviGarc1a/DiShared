/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 * /users:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             type: array
 * /users/protected:
 *   get:
 *     summary: Protected route
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: This is a protected route
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       401:
 *         description: Unauthorized. Token not found or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 */
var express = require('express')
var router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // Get users without the password field
  const users = await User.find({}, '-password')
  res.json(users)
})

// TODO: Remove this route when other protected routes are added
// Example Protected route
router.get('/protected', authMiddleware, (req, res) => {
  // Access userId from req object
  const userId = req.userId

  res.json({ message: 'This is a protected route', userId })
})

module.exports = router
