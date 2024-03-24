/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Retrieve and manage ratings
 * /ratings:
 *   get:
 *     summary: Returns the list of all the Ratings
 *     tags: [Ratings]
 *     responses:
 *       200:
 *         description: The list of the Ratings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             type: array
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *           type: object
 *           example:
 *             score: 4
 *             comment: "Great recipe!"
 *             recipe_id: 5f7d6c6b6e4f0b0017e9b3f4
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             type: object
 *       '400':
 *         description: Invalid input, object invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 * /ratings/{id}:
 *   get:
 *     summary: Get a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rating to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Rating found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *   put:
 *     summary: Update a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rating to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       '200':
 *         description: Rating updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       '400':
 *         description: Invalid input, object invalid
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *   delete:
 *     summary: Delete a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the rating to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Rating deleted successfully
 *       '404':
 *         description: Rating not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 */
var express = require('express')
var router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const {
  userHasNoRatingForRecipeMiddleware,
} = require('../middlewares/recipeMiddleware')
const { ratingExistsMiddleware } = require('../middlewares/ratingMiddleware')

const Rating = require('../models/rating')
const Recipe = require('../models/recipe')
const User = require('../models/user')

// GET all ratings
router.get('/', async function (req, res, next) {
  const recipes = await Rating.find()
  res.json(recipes)
})

// POST a new rating
router.post(
  '/',
  authMiddleware,
  userHasNoRatingForRecipeMiddleware,
  async function (req, res, next) {
    try {
      const { score, comment, recipe_id } = req.body
      const user_id = req.userId

      const rating = new Rating({
        score,
        comment,
        recipe_id,
        user_id,
      })

      await rating.save()
      res.json(rating)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
)

// GET a rating by ID
router.get('/:id', ratingExistsMiddleware, async function (req, res, next) {
  const rating = await Rating.findById(req.params.id).lean()

  // Add full recipe details to the response
  const recipe = await Recipe.findById(rating.recipe_id)
  rating.recipe = recipe ? recipe : { title: 'Deleted recipe' }

  // Add username
  const user = await User.findById(rating.user_id)
  rating.user = user ? user : { username: 'Deleted user' }

  res.json(rating)
})

module.exports = router
