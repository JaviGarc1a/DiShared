const Ingredient = require('../models/ingredient')

const ingredientExistMiddleware = async (req, res, next) => {
  // Check if the user exist
  const ingredient = await Ingredient.findOne({ name: req.body.name })
  if (ingredient) {
    return res.status(409).json({ message: 'Ingredient already exist.' })
  }
  req.ingredient = ingredient
  next()
}

module.exports = { ingredientExistMiddleware }
