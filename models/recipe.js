const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DifficultyEnum = ['easy', 'medium', 'hard']

const RecipeSchema = new Schema({
  title: String,
  description: String,
  steps: [String],
  preparation_time: Number,
  difficulty: { type: String, enum: DifficultyEnum },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  ingredients: [
    {
      ingredient_id: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String,
    },
  ],
})

RecipeSchema.virtual('url').get(function () {
  return `/recipes/${this._id}`
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
