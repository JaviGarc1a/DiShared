/**
 * @swagger
 * components:
 *   schemas:
 *           User:
 *               type: object
 *               required:
 *                   - username
 *                   - email
 *                   - password
 *               properties:
 *                   _id:
 *                       type: string
 *                       description: The auto-generated id of the user
 *                   username:
 *                       type: string
 *                       description: The username of the user
 *                   email:
 *                       type: string
 *                       description: The email of the user
 *                   password:
 *                       type: string
 *                       description: The password of the user
 *                   recipes:
 *                       type: array
 *                       items:
 *                           type: string
 *                           description: The id of the recipe created by the users
 *               example:
 *                   _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                   username: Alvaro
 *                   email: alvaro@gmail.com
 *                   password: Password123.
 *                   recipes: []
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // List of recipes created by the user
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
})

// Define a virtual property for the user's profile URL
UserSchema.virtual('url').get(function () {
  return `/users/${this._id}`
})

const User = mongoose.model('User', UserSchema)

module.exports = User
