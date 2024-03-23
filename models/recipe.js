/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - steps
 *         - difficulty
 *         - user_id
 *         - ingredients
 *       properties:
 *         _id:
 *             type: string
 *             description: The auto-generated id of the recipe
 *         title:
 *             type: string
 *             description: The title of the recipe
 *         _description:
 *             type: string
 *             description: The description of the recipe
 *         steps:
 *             type: array
 *             items:
 *                 type: string
 *             description: The steps to prepare the recipe
 *         preparation_time:
 *             type: integer
 *             description: The preparation time of the recipe in minutes
 *         difficulty:
 *             type: string
 *             enum:
 *                 - easy
 *                 - medium
 *                 - hard
 *             description: The difficulty of the recipe
 *         user_id:
 *            type: string
 *            description: The id of the user who created the recipe
 *         ingredients:
 *             type: array
 *             items:
 *                 type: object
 *                 properties:
 *                     ingredient_id:
 *                         type: string
 *                         description: The id of the ingredient
 *                     quantity:
 *                         type: number
 *                         description: The quantity of the ingredient
 *                     unit:
 *                         type: string
 *                         description: The unit of the ingredient
 *       example:
 *           _id: 5f7d6c6b6e4f0b0017e9b3f4
 *           title: Chocolate Cake
 *           description: A delicious chocolate cake
 *           steps: ["Preheat the oven to 350°F", "Mix the ingredients", "Bake for 30 minutes"]
 *           preparation_time: 30
 *           difficulty: easy
 *           user_id: 5f7d6c6b6e4f0b0017e9b3f4
 *           ingredients: [{ingredient_id: 5f7d6c6b6e4f0b0017e9b3f4, quantity: 2, unit: cups}]
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DifficultyEnum = ['easy', 'medium', 'hard']

const RecipeSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  steps: { type: [String], required: true },
  preparation_time: Number,
  difficulty: { type: String, enum: DifficultyEnum, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
