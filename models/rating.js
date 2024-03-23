const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  score: { type: Number, required: true, min: 0, max: 5 },
  comment: String,
  recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
})

// Define one rating on a recipe per user
RatingSchema.index({ recipe_id: 1, user_id: 1 }, { unique: true })

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating
