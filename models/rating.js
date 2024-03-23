const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  rating: Number,
  comment: String,
  recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe' },
})

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating
