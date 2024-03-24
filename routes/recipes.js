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
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *           type: object
 *           example:
 *             title: Chocolate Cake
 *             description: A delicious chocolate cake
 *             steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *             preparation_time: 30
 *             difficulty: easy
 *             user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *             ingredients: [
 *               {
 *                 name: chocolate,
 *                 quantity: 2,
 *                 unit: cups
 *               },
 *               {
 *                 name: sugar,
 *                 quantity: 1,
 *                 unit: tablespoon
 *               }
 *             ]
 *     responses:
 *       200:
 *         description: The recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: object
 *             example:
 *                 _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 title: Chocolate Cake
 *                 description: A delicious chocolate cake
 *                 steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *                 preparation_time: 30
 *                 difficulty: easy
 *                 user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 ingredients: [
 *                   {
 *                     name: chocolate,
 *                     quantity: 2,
 *                     unit: cups
 *                   },
 *                   {
 *                     name: sugar,
 *                     quantity: 1,
 *                     unit: tablespoon
 *                   }
 *                 ]
 *
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
 *       200:
 *         description: The recipe
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Recipe'
 *             type: object
 *             example:
 *                 _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 title: Chocolate Cake
 *                 description: A delicious chocolate cake
 *                 steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *                 preparation_time: 30
 *                 difficulty: easy
 *                 user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 ingredients: [
 *                   {
 *                     ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                     quantity: 2,
 *                     unit: cups,
 *                     name: flour
 *                   },
 *                   {
 *                     ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                     quantity: 1,
 *                     unit: tablespoon,
 *                     name: sugar
 *                   }
 *                 ]
 *                 user: {
 *                   _id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                   username: Alvaro,
 *                   email: alvaro@gmail.com,
 *                   recipes: [
 *                     5f7d6c6b6e4f0b0017e9b3f4
 *                   ]
 *                 }
 *                 ratings: [
 *                   {
 *                     _id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                     rating: 5,
 *                     user_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                     recipe_id: 5f7d6c6b6e4f0b0017e9b3f4,
 *                     poster: Alvaro
 *                   }
 *                 ]
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *   put:
 *     summary: Update a recipe. Provide only the fields you want to update
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe ID
 *         example: 5f7d6c6b6e4f0b0017e9b3f4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *           type: object
 *           example:
 *             title: Chocolate Cake
 *             description: A delicious chocolate cake
 *             steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *             preparation_time: 30
 *             difficulty: easy
 *             user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *             ingredients: [
 *               {
 *                 name: chocolate,
 *                 quantity: 2,
 *                 unit: cups
 *               },
 *               {
 *                 name: sugar,
 *                 quantity: 1,
 *                 unit: tablespoon
 *               }
 *             ]
 *     responses:
 *       200:
 *         description: The updated recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: object
 *             example:
 *                 _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 title: Chocolate Cake
 *                 description: A delicious chocolate cake
 *                 steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *                 preparation_time: 30
 *                 difficulty: easy
 *                 user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 ingredients: [
 *                   {
 *                     name: chocolate,
 *                     quantity: 2,
 *                     unit: cups
 *                   },
 *                   {
 *                     name: sugar,
 *                     quantity: 1,
 *                     unit: tablespoon
 *                   }
 *                 ]
 *   delete:
 *     summary: Delete a recipe by ID
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
 *       200:
 *         description: The recipe has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *             type: object
 * /recipes/popular:
 *   get:
 *     summary: Get X popular recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of popular recipes to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of X popular recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '401':
 *         description: Unauthorized
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
const {
  userRecipeOwnershipMiddleware,
} = require('../middlewares/userMiddleware')
const { recipeExistMiddleware } = require('../middlewares/recipeMiddleware')

const Recipe = require('../models/recipe')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')
const Rating = require('../models/rating')

// GET all recipes
router.get('/', async function (req, res, next) {
  const recipes = await Recipe.find()
  res.json(recipes)
})

// GET X popular recipes
router.get('/popular', async function (req, res, next) {
  const limit = parseInt(req.query.limit) || 5
  const ratings = await Rating.find().lean()
  console.log(ratings)

  // Group ratings by recipe_id
  const ratingsByRecipe = ratings.reduce((acc, rating) => {
    if (!acc[rating.recipe_id]) {
      acc[rating.recipe_id] = []
    }
    acc[rating.recipe_id].push(rating)
    return acc
  }, {})

  // Calculate average rating for each recipe
  const recipeRatings = Object.keys(ratingsByRecipe).map((recipe_id) => {
    const ratings = ratingsByRecipe[recipe_id]
    const avgScore =
      ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length
    return { recipe_id, avgScore }
  })

  // Sort by average rating
  recipeRatings.sort((a, b) => b.avgScore - a.avgScore)

  // Fetch recipe details
  const popularRecipes = await Promise.all(
    recipeRatings.slice(0, limit).map(async (recipeRating) => {
      const recipe = await Recipe.findById(recipeRating.recipe_id)
      return { ...recipe._doc, avgScore: recipeRating.avgScore }
    }),
  )

  res.json(popularRecipes)
})

// GET a recipe by ID
router.get('/:id', recipeExistMiddleware, async function (req, res, next) {
  try {
    const recipe = req.recipe.toObject()

    const user = await User.findById(recipe.user_id).select('-password')

    recipe.user = user ? user : { username: 'Deleted User' }

    const ratings = await Rating.find({ recipe_id: recipe._id }).lean()

    if (ratings) {
      recipe.rating = ratings.reduce((acc, rating) => acc + rating.score, 0)
      recipe.rating /= ratings.length
      recipe.ratings = ratings
      const users = await User.find(
        { _id: { $in: ratings.map((r) => r.user_id) } },
        '-password',
      )
      if (users) {
        recipe.ratings = recipe.ratings.map((r) => {
          const user = users.find((u) => u._id.equals(r.user_id))
          return {
            ...r,
            poster: user ? user.username : { username: 'Deleted User' },
          }
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
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// POST a new recipe (protected route)
router.post('/', authMiddleware, async function (req, res, next) {
  const {
    title,
    description,
    steps,
    preparation_time,
    difficulty,
    ingredients,
  } = req.body

  // Replace ingredient name with ingredient_id
  for (let i of ingredients) {
    i.ingredient_id = await Ingredient.findOne({ name: i.name })
    // Create a new ingredient if it doesn't exist
    if (!i.ingredient_id) {
      const ingredient = new Ingredient({ name: i.name })
      try {
        i.ingredient_id = await ingredient.save()
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    }
    delete i.name
  }

  const recipe = new Recipe({
    title,
    description,
    steps,
    preparation_time,
    difficulty,
    user_id: req.userId,
    ingredients,
  })

  try {
    const savedRecipe = await recipe.save()
    res.status(200).json(savedRecipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update a recipe by ID (protected route)
router.put(
  '/:id',
  authMiddleware,
  recipeExistMiddleware,
  userRecipeOwnershipMiddleware,
  async function (req, res, next) {
    const {
      title,
      description,
      steps,
      preparation_time,
      difficulty,
      ingredients,
    } = req.body

    // Replace ingredient name with ingredient_id
    if (ingredients) {
      for (let i of ingredients) {
        i.ingredient_id = await Ingredient.findOne({ name: i.name })
        // Create a new ingredient if it doesn't exist
        if (!i.ingredient_id) {
          const ingredient = new Ingredient({ name: i.name })
          try {
            i.ingredient_id = await ingredient.save()
          } catch (err) {
            res.status(400).json({ message: err.message })
          }
        }
        delete i.name
      }
    }

    const recipe = {
      title,
      description,
      steps,
      preparation_time,
      difficulty,
      user_id: req.userId,
      ingredients,
    }

    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        recipe,
        {
          new: true,
        },
      )
      res.status(200).json(updatedRecipe)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
)

// DELETE a recipe by ID (protected route)
router.delete(
  '/:id',
  authMiddleware,
  recipeExistMiddleware,
  userRecipeOwnershipMiddleware,
  async function (req, res, next) {
    try {
      const recipe = req.recipe
      await recipe.deleteOne()
      res.json({ message: 'The recipe has been deleted' })
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

module.exports = router
