const Recipe = require('../models/recipe')
const Rating = require('../models/rating')
const User = require('../models/user')

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

const userExistMiddleware = async (req, res, next) => {
  // Check if the user exist
  const user =
    (await User.findOne({ email: req.body.email })) ||
    (await User.findOne({ username: req.body.username }))
  if (user) {
    return res.status(409).json({ message: 'Username or email already exist.' })
  }
  req.user = user
  next()
}

const userOwnershipMiddleware = async (req, res, next) => {
  // Check if the user is the owner of the user
  const user = await User.findById(req.params.id)
  const userRequest = await User.findById(req.userId)
  console.log(req)
  if (req.userId !== user._id.toString() && userRequest.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Forbidden. You are not the owner of the user.' })
  }
  next()
}

module.exports = {
  userRecipeOwnershipMiddleware,
  userRatingOwnershipMiddleware,
  userExistMiddleware,
  userOwnershipMiddleware,
}
