/**
 * @swagger
 * components:
 *   schemas:
 *           Ingredient:
 *               type: object
 *               required:
 *                   - name
 *               properties:
 *                   _id:
 *                       type: string
 *                       description: The auto-generated id of the ingredient
 *                   name:
 *                       type: string
 *                       description: The name of the ingredient
 *               example:
 *                   _id: 660046e12b7446bea8c470bd
 *                   name: Salt
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
  name: {
    type: String,
    unique: true,
    inmutable: true,
    lowercase: true,
    required: true,
  },
})

IngredientSchema.virtual('url').get(function () {
  return `/ingredients/${this._id}`
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema)

module.exports = Ingredient
