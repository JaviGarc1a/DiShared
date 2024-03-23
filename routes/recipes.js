/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management and retrieval
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: The list of the Recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: array
 * /recipes/{id}:
 *   get:
 *     summary: Returns a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe ID
 *         example: 5f7d6c6b6e4f0b0017e9b3f4
 *     responses:
 *         200:
 *           description: The recipe
 *           content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Recipe'
 *               type: object
 *               example:
 *                   _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                   title: Chocolate Cake
 *                   description: A delicious chocolate cake
 *                   steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *                   preparation_time: 30
 *                   difficulty: easy
 *                   user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                   ingredients: [
 *                     {
 *                       ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                       quantity: 2,
 *                       unit: cups
 *                     },
 *                     {
 *                       ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                       quantity: 1,
 *                       unit: tablespoon
 *                     }
 *                   ]
 */

var express = require('express')
var router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const Recipe = require('../models/recipe')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')
const Rating = require('../models/rating')

// GET all recipes
router.get('/', async function (req, res, next) {
  const recipes = await Recipe.find()
  res.json(recipes)
})

// GET a recipe by ID
router.get('/:id', async function (req, res, next) {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .select('-user_id')
      .lean()

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    const user = await User.findById(recipe.user_id).select('-password')

    if (user) {
      recipe.user = user
    }

    const ratings = await Rating.find({ recipe_id: recipe._id }).lean()

    if (ratings) {
      recipe.ratings = ratings
      const users = await User.find(
        { _id: { $in: ratings.map((r) => r.user_id) } },
        '-password',
      )
      if (users) {
        recipe.ratings = recipe.ratings.map((r) => {
          const user = users.find((u) => u._id.equals(r.user_id))
          return { ...r, poster: user.username }
        })
      }
    }

    const ingredients = await Ingredient.find({
      _id: { $in: recipe.ingredients.map((i) => i.ingredient_id) },
    })

    // Add the ingredient name to the recipe
    if (ingredients) {
      recipe.ingredients = recipe.ingredients.map((i) => {
        const ingredient = ingredients.find((ing) =>
          ing._id.equals(i.ingredient_id),
        )
        return { ...i, name: ingredient.name }
      })
    }

    res.json(recipe)
  } catch (err) {
    return res.status(500).json({ message: 'Recipe not found' })
  }
})

module.exports = router
