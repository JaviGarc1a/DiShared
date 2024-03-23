const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe' },
})

// Define one rating on a recipe per user
RatingSchema.index({ recipe_id: 1, user_id: 1 }, { unique: true })

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating
