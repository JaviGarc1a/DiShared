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
 * /users/{id}:
 *   get:
 *     summary: Get a User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *         example: 65ff1d51975b564ffe1b016d
 *     responses:
 *       200:
 *        description: The User data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *          type: object
 *          example:
 *              _id: 65ff1d51975b564ffe1b016d
 *              username: Alvaro
 *              email: alvaro@gmail.com
 *              recipes: [5f7d6c6b6e4f0b0017e9b3f4]
 *       401:
 *        description: Unauthorized. Token not found or invalid.
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       404:
 *        description: The User was not found
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       500:
 *        description: Internal Server Error
 *        content:
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
router.get('/', async function (req, res) {
  // Get users without the password field
  const users = await User.find({}, '-password')
  res.json(users)
})

/* GET user by ID */
router.get('/:id', authMiddleware, async function (req, res) {
  const { id } = req.params

  try {
    const user = await User.findById(id, '-password')
    res.json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
