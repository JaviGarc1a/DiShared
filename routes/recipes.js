/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management and retrieval
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: s
 *         required: false
 *         description: Search term
 *         schema:
 *           type: string
 *       - in: query
 *         name: minRating
 *         required: false
 *         description: Minimum rating
 *         schema:
 *           type: int
 *       - in: query
 *         name: maxRating
 *         required: false
 *         description: Maxinum rating
 *         schema:
 *           type: int
 *       - in: query
 *         name: minTime
 *         required: false
 *         description: Minimum preparation time
 *         schema:
 *           type: int
 *       - in: query
 *         name: maxTime
 *         required: false
 *         description: Maximum preparation time
 *         schema:
 *           type: int
 *       - in: query
 *         name: difficulty
 *         required: false
 *         description: Maxinum rating
 *         schema:
 *           type: string
 *           enum: [easy, medium, hard]
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
 *             category: dessert
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
 *                 category: dessert
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
 *                 category: dessert
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
 *             category: dessert
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
 *                 category: dessert
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
 * /recipes/latest:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit of recipes to retrieve
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: The list of the Recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: array
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
 *       - in: query
 *         name: year
 *         required: false
 *         description: Year to filter by
 *         schema:
 *           type: integer
 *       - in: query
 *         name: month
 *         required: false
 *         description: Month to filter by (integer between 1 and 12)
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
 * /recipes/stats:
 *   get:
 *     summary: Retrieves various statistics about the recipes
 *     tags: [Recipes]
 *     responses:
 *       '200':
 *         description: Various statistics about the recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRecipes:
 *                   type: integer
 *                   description: Total count of recipes
 *                 totalRatings:
 *                   type: integer
 *                   description: Total count of ratings
 *                 avgRating:
 *                   type: number
 *                   description: Average rating across all recipes
 *                 ingredientsCount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredient:
 *                         type: string
 *                         description: Name of the ingredient
 *                       count:
 *                         type: integer
 *                         description: Number of recipes containing the ingredient
 *                   description: Count of recipes per ingredient
 *                 avgIngredients:
 *                   type: number
 *                   description: Average number of ingredients per recipe
 *                 recipesPerIngredient:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ingredient:
 *                         type: string
 *                         description: Name of the ingredient
 *                       count:
 *                         type: integer
 *                         description: Number of recipes containing the ingredient
 *                   description: Count of recipes per ingredient
 *                 recipesPerDifficulty:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       difficulty:
 *                         type: string
 *                         enum: [easy, medium, hard]
 *                         description: Difficulty level of the recipe
 *                       count:
 *                         type: integer
 *                         description: Number of recipes with the given difficulty level
 *                   description: Count of recipes per difficulty level
 *                 topContributors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         description: Username of the contributor
 *                       count:
 *                         type: integer
 *                         description: Number of recipes contributed by the user
 *                   description: Top contributors based on the number of recipes contributed
 *                 avgPreparationTime:
 *                   type: number
 *                   description: Average preparation time across all recipes
 *       '500':
 *         description: Internal server error
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
 * /recipes/trending:
 *   get:
 *     summary: Retrieves recipes that have risen in popularity the fastest in the last month.
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of trending recipes to retrieve. Default is 5.
 *     responses:
 *       '200':
 *         description: An array of trending recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *         example:
 *           - _id: 5f7d6c6b6e4f0b0017e9b3f4
 *             title: Chocolate Cake
 *             description: A delicious chocolate cake
 *             steps:
 *               - Preheat the oven to 350°F
 *               - Mix the ingredients
 *               - Bake for 30 minutes
 *             preparation_time: 30
 *             difficulty: easy
 *             category: dessert
 *             user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *             ingredients:
 *               - ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 quantity: 2
 *                 unit: cups
 *                 name: flour
 *               - ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 quantity: 1
 *                 unit: tablespoon
 *                 name: sugar
 *             user:
 *               _id: 5f7d6c6b6e4f0b0017e9b3f4
 *               username: Alvaro
 *               email: alvaro@gmail.com
 *               recipes:
 *                 - 5f7d6c6b6e4f0b0017e9b3f4
 *             ratings:
 *               - _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 rating: 5
 *                 user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 recipe_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 poster: Alvaro
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
 *       '500':
 *         description: Internal Server Error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 * /recipes/user/{username}:
 *   get:
 *     summary: Get a list of a user's recipes by their username
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user whose recipes to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of the user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *         example:
 *           - _id: 5f7d6c6b6e4f0b0017e9b3f4
 *             title: Chocolate Cake
 *             description: A delicious chocolate cake
 *             steps:
 *               - Preheat the oven to 350°F
 *               - Mix the ingredients
 *               - Bake for 30 minutes
 *             preparation_time: 30
 *             difficulty: easy
 *             category: dessert
 *             user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *             ingredients:
 *               - ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 quantity: 2
 *                 unit: cups
 *                 name: flour
 *               - ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 quantity: 1
 *                 unit: tablespoon
 *                 name: sugar
 *             user:
 *               _id: 5f7d6c6b6e4f0b0017e9b3f4
 *               username: Alvaro
 *               email: alvaro@gmail.com
 *               recipes:
 *                 - 5f7d6c6b6e4f0b0017e9b3f4
 *             ratings:
 *               - _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 rating: 5
 *                 user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 recipe_id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 poster: Alvaro
 *       '400':
 *         description: Bad Request, username is required
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 * /recipes/wo-ingredients:
 *   get:
 *     summary: Get recipes without specified ingredients
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: ings
 *         required: true
 *         description: List of ingredients to exclude from recipes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         example: ["flour", "sugar"]
 *     responses:
 *       '200':
 *         description: A list of recipes without the specified ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 * /recipes/ingredients:
 *   get:
 *     summary: Get recipes with specified ingredients
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: ings
 *         required: true
 *         description: List of ingredients to include in recipes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         example: ["flour", "sugar"]
 *     responses:
 *       '200':
 *         description: A list of recipes with the specified ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 * /recipes/similar/{id}:
 *   get:
 *     summary: Get similar recipes. Similarity is based on the ingredients of the recipe, if the recipe has the same ingredients, it is considered similar.
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the recipe to get similar recipes
 *         example: 66008d36779401ccf7b26af3
 *     responses:
 *       '200':
 *         description: A list of recipes similar to the specified recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 * /recipes/user/{id}/category/{category}:
 *   get:
 *     summary: Get recipes by user and category
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the user
 *         example: 66008d36779401ccf7b26af3
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category of the recipe
 *         example: dessert
 *     responses:
 *       '200':
 *         description: A list of recipes by the user and category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: array
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The message of the response
 */

var express = require('express')
var router = express.Router()

const { authMiddleware } = require('../middlewares/authMiddleware')
const {
  userRecipeOwnershipMiddleware,
  userNotExistMiddleware,
} = require('../middlewares/userMiddleware')
const { recipeExistMiddleware } = require('../middlewares/recipeMiddleware')

const { getRecipeDetails } = require('../helpers/recipeHelpers')

const Recipe = require('../models/recipe')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')
const Rating = require('../models/rating')

// GET all recipes
router.get('/', async function (req, res) {
  const searchTerm = req.query.s || ''
  const minRating = parseInt(req.query.minRating) || 0
  const maxRating = parseInt(req.query.maxRating) || 5
  const timeMin = parseInt(req.query.timeMin) || 0
  const timeMax = parseInt(req.query.timeMax) || Infinity
  const difficulty = req.query.difficulty || ''

  const ratingFilter = await Rating.find({
    score: { $gte: minRating, $lte: maxRating },
  })
  // Define the search criteria
  const searchCriteria = {
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } }, // Search titles (case-insensitive)
      { description: { $regex: searchTerm, $options: 'i' } }, // Search descriptions (case-insensitive)
    ],
    difficulty: { $regex: difficulty, $options: 'i' }, // Search by difficulty (case-insensitive)
    preparation_time: { $gte: timeMin, $lte: timeMax }, // Search by preparation time
  }

  const recipes = await Recipe.find(searchCriteria)

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeRatings = ratingFilter.filter(
      (rating) => rating.recipe_id.toString() === recipe._id.toString(),
    )
    return recipeRatings.length > 0 || minRating === 0
  })

  res.json(filteredRecipes)
})

// Get X latest recipes
router.get('/latest', async function (req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5
    const recipes = await Recipe.find().sort({ _id: -1 }).limit(limit)
    res.json(recipes)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET X popular recipes
router.get('/popular', async function (req, res) {
  const limit = parseInt(req.query.limit) || 5
  const year = parseInt(req.query.year) || false
  const month = parseInt(req.query.month) || false
  const query = {}

  if (year && month) {
    query.created_at = {
      $gte: new Date(year, month - 1, 1),
      $lt: new Date(year, month, 1),
    }
  } else if (year) {
    query.created_at = {
      $gte: new Date(year, 0, 1),
      $lt: new Date(year + 1, 0, 1),
    }
  } else if (month) {
    query.created_at = {
      $gte: new Date(new Date().getFullYear(), month - 1, 1),
      $lt: new Date(new Date().getFullYear(), month, 1),
    }
  }

  const ratings = await Rating.find(query).lean()

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

// GET recipes stats
router.get('/stats', authMiddleware, async function (req, res) {
  const recipes = await Recipe.find().lean()
  const ratings = await Rating.find().lean()

  const totalRecipes = recipes.length
  const totalRatings = ratings.length
  const avgRating =
    ratings.reduce((acc, rating) => acc + rating.score, 0) / totalRatings

  // Top ingredients
  const ingredients = await Ingredient.find()
  const ingredientsCount = ingredients.map((ingredient) => {
    const count = recipes.reduce((acc, recipe) => {
      const hasIngredient = recipe.ingredients.find((i) =>
        i.ingredient_id.equals(ingredient._id),
      )
      return acc + (hasIngredient ? 1 : 0)
    }, 0)
    return { ingredient: ingredient.name, count }
  })
  ingredientsCount.sort((a, b) => b.count - a.count)

  // Avg number of ingredients per recipe
  const avgIngredients =
    recipes.reduce((acc, recipe) => acc + recipe.ingredients.length, 0) /
    totalRecipes

  // Recipes per ingredient
  const recipesPerIngredient = ingredients.map((ingredient) => {
    const count = recipes.reduce((acc, recipe) => {
      const hasIngredient = recipe.ingredients.find((i) =>
        i.ingredient_id.equals(ingredient._id),
      )
      return acc + (hasIngredient ? 1 : 0)
    }, 0)
    return { ingredient: ingredient.name, count }
  })
  recipesPerIngredient.sort((a, b) => b.count - a.count)

  // Recipes per difficulty
  const recipesPerDifficulty = ['easy', 'medium', 'hard'].map((difficulty) => {
    const count = recipes.reduce(
      (acc, recipe) => (recipe.difficulty === difficulty ? acc + 1 : acc),
      0,
    )
    return { difficulty, count }
  })
  recipesPerDifficulty.sort((a, b) => b.count - a.count)

  // Top contributors (number of recipes)
  const users = await User.find()
  const topContributors = users.map((user) => {
    const count = recipes.reduce(
      (acc, recipe) => (recipe.user_id.equals(user._id) ? acc + 1 : acc),
      0,
    )
    return { user: user.username, count }
  })
  topContributors.sort((a, b) => b.count - a.count).slice(0, 3)

  // Average preparation time
  const avgPreparationTime =
    recipes.reduce((acc, recipe) => acc + recipe.preparation_time, 0) /
    totalRecipes

  res.json({
    totalRecipes,
    totalRatings,
    avgRating,
    ingredientsCount,
    avgIngredients,
    recipesPerIngredient,
    recipesPerDifficulty,
    avgPreparationTime,
    topContributors,
  })
})

// GET trending recipes
router.get('/trending', authMiddleware, async function (req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5

    // Get ratings for the last month
    const currentDate = new Date()
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    )
    const currentMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )

    const ratingsLastMonth = await Rating.find({
      created_at: { $gte: lastMonthDate, $lt: currentMonthDate },
    }).lean()

    // Group ratings by recipe ID
    const ratingsByRecipeLastMonth = ratingsLastMonth.reduce((acc, rating) => {
      if (!acc[rating.recipe_id]) {
        acc[rating.recipe_id] = []
      }
      acc[rating.recipe_id].push(rating)
      return acc
    }, {})

    // Calculate average rating for each recipe in the last month
    const avgRatingLastMonth = {}
    for (const recipeId in ratingsByRecipeLastMonth) {
      const ratings = ratingsByRecipeLastMonth[recipeId]
      const avgScore =
        ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length
      avgRatingLastMonth[recipeId] = avgScore
    }

    // Calculate average rating for each recipe in the current month
    const ratingsCurrentMonth = await Rating.find({
      created_at: { $gte: currentMonthDate },
    }).lean()

    const ratingsByRecipeCurrentMonth = ratingsCurrentMonth.reduce(
      (acc, rating) => {
        if (!acc[rating.recipe_id]) {
          acc[rating.recipe_id] = []
        }
        acc[rating.recipe_id].push(rating)
        return acc
      },
      {},
    )

    // Calculate the difference in average rating between the last month and the current month
    const ratingDiff = await Promise.all(
      Object.keys(ratingsByRecipeCurrentMonth).map(async (recipeId) => {
        const ratings = ratingsByRecipeCurrentMonth[recipeId]
        const avgScore =
          ratings.reduce((acc, rating) => acc + rating.score, 0) /
          ratings.length
        const change = avgScore - (avgRatingLastMonth[recipeId] || 0)
        return { recipeId, change }
      }),
    )

    // Sort recipes by change in popularity
    const trendingRecipes = ratingDiff
      .sort((a, b) => b.change - a.change)
      .slice(0, limit)

    // Fetch recipe details for trending recipes
    const recipes = await Promise.all(
      trendingRecipes.map(async (recipe) => {
        const recipeObject = await Recipe.findById(recipe.recipeId)
        const recipeDetails = await getRecipeDetails(recipeObject.toObject())
        return { ...recipeDetails, change: recipe.change }
      }),
    )

    res.json(recipes)
  } catch (error) {
    console.error('Error fetching trending recipes:', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /recipes/user/:id - Get a list of a user's recipes by their ID.
router.get('/user/:username', authMiddleware, async function (req, res) {
  try {
    const username = req.params.username

    if (!username) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const user = await User.findOne({ username: username })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    var recipes = await Recipe.find({ user_id: user._id })

    recipes = await Promise.all(
      recipes.map(async (recipe) => {
        return await getRecipeDetails(recipe.toObject())
      }),
    )

    res.json(recipes)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /recipes/wo-ingredients?ings=[...] - Retrieves a list of recipes that don't contain the ingredients ing1, ing2, and ing3.
router.get('/wo-ingredients', authMiddleware, async function (req, res) {
  try {
    const ingredients = req.query.ings.map((ing) => ing.trim())
    // find the ingredient by name case insensitive
    const ingredientsIds = await Ingredient.find({
      name: { $in: ingredients, $options: 'i' },
    })

    var recipes = await Recipe.find({
      ingredients: {
        $not: {
          $elemMatch: {
            ingredient_id: { $in: ingredientsIds },
          },
        },
      },
    })

    recipes = await Promise.all(
      recipes.map(async (recipe) => {
        return await getRecipeDetails(recipe.toObject())
      }),
    )
    res.json(recipes)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /recipes/ingredients?ings=[...] - Retrieves a list of recipes that contain the ingredients ing1, ing2, and ing3.
router.get('/ingredients', authMiddleware, async function (req, res) {
  try {
    const ingredients = req.query.ings.map((ing) => ing.trim())
    // find the ingredient by name case insensitive
    const ingredientsIds = await Ingredient.find({
      name: { $in: ingredients, $options: 'i' },
    })

    var recipes = await Recipe.find({
      ingredients: {
        $elemMatch: {
          ingredient_id: { $in: ingredientsIds },
        },
      },
    })

    recipes = await Promise.all(
      recipes.map(async (recipe) => {
        return await getRecipeDetails(recipe.toObject())
      }),
    )
    res.json(recipes)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET a recipe by ID
router.get('/:id', recipeExistMiddleware, async function (req, res) {
  try {
    var recipe = req.recipe.toObject()

    recipe = await getRecipeDetails(recipe)

    res.json(recipe)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// POST a new recipe (protected route)
router.post('/', authMiddleware, async function (req, res) {
  const {
    title,
    description,
    steps,
    preparation_time,
    difficulty,
    category,
    ingredients,
  } = req.body

  // Replace ingredient name with ingredient_id
  for (let i of ingredients) {
    // Find the ingredient by name (case insensitive)
    i.ingredient_id = await Ingredient.findOne({
      name: { $regex: i.name, $options: 'i' },
    })
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
    category,
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
  async function (req, res) {
    const {
      title,
      description,
      steps,
      preparation_time,
      difficulty,
      category,
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
      category,
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
  async function (req, res) {
    try {
      const recipe = req.recipe
      await recipe.deleteOne()
      res.json({ message: 'The recipe has been deleted' })
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

// GET similar recipes
router.get('/similar/:id', recipeExistMiddleware, async function (req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id)
    const ingredients = recipe.ingredients.map((i) => i.ingredient_id)

    const similarRecipes = await Recipe.find({
      _id: { $ne: recipe._id },
      ingredients: {
        $elemMatch: {
          ingredient_id: { $in: ingredients },
        },
      },
    })
    res.json(similarRecipes)
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET recipes by user and category
router.get(
  '/user/:id/category/:category',
  authMiddleware,
  userNotExistMiddleware,
  async function (req, res) {
    try {
      const user = await User.findById(req.params.id)

      const recipes = await Recipe.find({
        user_id: user._id,
        category: req.params.category,
      })

      res.json(recipes)
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  },
)

module.exports = router
