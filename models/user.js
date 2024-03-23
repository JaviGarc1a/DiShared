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
