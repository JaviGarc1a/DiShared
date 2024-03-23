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
 */
var express = require('express')
var router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // Get users without the password field
  const users = await User.find({}, '-password')
  res.json(users)
})

module.exports = router
