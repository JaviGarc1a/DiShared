/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management and retrieval
 * /recipes:
 *   get:
 *     summary: Returns the list of all the recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: The list of the Recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *             type: array
 */

var express = require('express')
var router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const Recipe = require('../models/recipe')

// GET all recipes
router.get('/', async function (req, res, next) {
  const recipes = await Recipe.find()
  res.json(recipes)
})

module.exports = router
