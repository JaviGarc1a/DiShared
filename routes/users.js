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
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           type: object
 *           example:
 *             username: Javier
 *             email: javier@gmail.com
 *             password: Javier123.
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             type: object
 *             example:
 *                 _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 username: Javier
 *                 email: javier@gmail.com
 *                 password: Javier123.
 *       500:
 *         description: Internal Server Error
 *         content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    description: The message of the response
 *              type: object
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
 *                   description: The message of the response
 *             type: object
 *       404:
 *        description: The User was not found
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       500:
 *        description: Internal Server Error
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *
 *   put:
 *     summary: Update a User by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *         example: 65ff1d51975b564ffe1b016d
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           type: object
 *           example:
 *             username: Alvaro
 *             email: alvaro1@gmail.com
 *             password: Alvaro123.
 *     responses:
 *       200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *            type: object
 *            example:
 *                _id: 65ff1d51975b564ffe1b016d
 *                username: Alvaro
 *                email: alvaro1@gmail.com
 *                password: Alvaro123.
 *       401:
 *        description: Unauthorized. Token not found or invalid.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *       404:
 *        description: The User was not found
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *       500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *   delete:
 *     summary: Delete a user by ID
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
 *         description: The user has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *
 */
var express = require('express')
var router = express.Router()

const { authMiddleware } = require('../middlewares/authMiddleware')
const {
  userExistMiddleware,
  userNotExistMiddleware,
  userCanEditUser,
} = require('../middlewares/userMiddleware')

const User = require('../models/user')
const { getUserRecipes } = require('../helpers/userHelpers')

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    // Get users without the password field
    const users = await User.find({}, '-password')

    // Fetch recipes for each user
    const usersWithRecipes = await Promise.all(
      users.map(async (user) => {
        const userRecipes = await getUserRecipes(user.recipes)
        user.recipes = userRecipes
        return user
      }),
    )

    res.json(usersWithRecipes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/* POST create user */
router.post('/', userExistMiddleware, async function (req, res) {
  const { username, email, password } = req.body

  try {
    const user = new User({ username, email, password })
    await user.save()

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

/* GET user by ID */
router.get(
  '/:id',
  authMiddleware,
  userNotExistMiddleware,
  async function (req, res) {
    const { id } = req.params

    try {
      // Get user without the password field
      const user = await User.findById(id, '-password')

      // Fetch recipes for user
      const userRecipes = await getUserRecipes(user.recipes)
      const userWithRecipes = { ...user._doc, recipes: userRecipes }

      res.json(userWithRecipes)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

/* PUT update user by ID */
router.put(
  '/:id',
  authMiddleware,
  userNotExistMiddleware,
  userCanEditUser,
  async function (req, res) {
    const { username, email, password } = req.body

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email, password },
        { new: true },
      )
      res.status(200).json(updateUser)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

/* DELETE user by ID */
router.delete(
  '/:id',
  authMiddleware,
  userCanEditUser,
  async function (req, res) {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id)
      if (deleteUser) {
        res.status(200).json({ message: 'User deleted' })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

module.exports = router
