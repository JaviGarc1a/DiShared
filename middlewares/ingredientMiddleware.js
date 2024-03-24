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

const ingredientNotExistMiddleware = async (req, res, next) => {
  // Check if the ingredient does not exist
  try {
    const ingredient = await Ingredient.findById(req.params.id)
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found.' })
    }
    next()
  } catch (error) {
    return res.status(404).json({ message: 'Ingredient not found.' })
  }
}

module.exports = { ingredientExistMiddleware, ingredientNotExistMiddleware }
