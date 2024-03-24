const Recipe = require('../models/recipe')
const Rating = require('../models/rating')

const ratingExistsMiddleware = async (req, res, next) => {
  const rating = await Rating.findById(req.params.id)
  if (!rating) {
    return res.status(404).json({ message: 'Rating not found.' })
  }
  next()
}

module.exports = { ratingExistsMiddleware }
