const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
  name: { type: String, unique: true, inmutable: true, required: true },
})

IngredientSchema.virtual('url').get(function () {
  return `/ingredients/${this._id}`
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

module.exports = Ingredient
