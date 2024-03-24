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
 */
var express = require('express')
var router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const {
  userHasNoRatingForRecipeMiddleware,
} = require('../middlewares/recipeMiddleware')

const Rating = require('../models/rating')

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
  },
)

module.exports = router
