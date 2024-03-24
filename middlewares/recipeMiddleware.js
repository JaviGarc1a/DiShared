const Recipe = require('../models/recipe')
const Rating = require('../models/rating')

const recipeExistMiddleware = async (req, res, next) => {
  // Check if the user is the owner of the recipe
  const recipe = await Recipe.findById(req.params.id)
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found.' })
  }
  req.recipe = recipe
  next()
}

const userHasNoRatingForRecipeMiddleware = async (req, res, next) => {
  const recipe_id = req.body.recipe_id
  const user_id = req.userId

  console.log('recipe_id', recipe_id)
  const recipe = await Recipe.findById(recipe_id)
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found.' })
  }

  const rating = await Rating.findOne({ recipe_id, user_id })
  if (rating) {
    return res
      .status(403)
      .json({ message: 'Forbidden. You have already rated this recipe.' })
  }
  next()
}

module.exports = { recipeExistMiddleware, userHasNoRatingForRecipeMiddleware }
