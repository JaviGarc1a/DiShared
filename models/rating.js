/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - score
 *         - recipe_id
 *         - user_id
 *       properties:
 *         score:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: The score of the rating (0 to 5)
 *         comment:
 *           type: string
 *           description: Optional comment for the rating
 *         recipe_id:
 *           type: string
 *           description: The ID of the recipe being rated
 *         user_id:
 *           type: string
 *           description: The ID of the user who rated the recipe
 *       example:
 *         score: 4
 *         comment: "Great recipe!"
 *         recipe_id: 5f7d6c6b6e4f0b0017e9b3f4
 *         user_id: 5f7d6c6b6e4f0b0017e9b3f4
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
  score: { type: Number, required: true, min: 0, max: 5 },
  comment: String,
  recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe', inmutable: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', inmutable: true },
  createdAt: { type: Date, default: Date.now },
})

// Define one rating on a recipe per user
RatingSchema.index({ recipe_id: 1, user_id: 1 }, { unique: true })

// create "CreatedAt" field on save
RatingSchema.pre('save', function (next) {
  this.createdAt = new Date()
  next()
})

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating
