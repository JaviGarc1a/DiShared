const Recipe = require('../models/recipe')
const Rating = require('../models/rating')

const userRecipeOwnershipMiddleware = async (req, res, next) => {
  // Check if the user is the owner of the recipe
  const recipe = await Recipe.findById(req.params.id)
  if (req.userId !== recipe.user_id.toString()) {
    return res
      .status(403)
      .json({ message: 'Forbidden. You are not the owner of the recipe.' })
  }
  next()
}

const userRatingOwnershipMiddleware = async (req, res, next) => {
  // Check if the user is the owner of the rating
  const rating = await Rating.findById(req.params.id)
  if (req.userId !== rating.user_id.toString()) {
    return res
      .status(403)
      .json({ message: 'Forbidden. You are not the owner of the rating.' })
  }
  next()
}

module.exports = {
  userRecipeOwnershipMiddleware,
  userRatingOwnershipMiddleware,
}
