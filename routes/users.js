var express = require('express')
var router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  // Get users without the password field
  const users = await User.find({}, '-password')
  res.json(users)
})

module.exports = router
