const Recipe = require('../models/recipe')

const recipeExistMiddleware = async (req, res, next) => {
  // Check if the user is the owner of the recipe
  const recipe = await Recipe.findById(req.params.id)
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found.' })
  }
  req.recipe = recipe
  next()
}

module.exports = { recipeExistMiddleware }
