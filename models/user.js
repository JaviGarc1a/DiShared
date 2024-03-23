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
 *                   recipes: []
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

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

// Pre-save hook to hash the password before saving the user to the database
UserSchema.pre('save', async function (next) {
  try {
    // Check if the password has been modified or is new
    if (!this.isModified('password')) {
      return next()
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10)

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt)

    // Replace the plain text password with the hashed password
    this.password = hashedPassword

    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
