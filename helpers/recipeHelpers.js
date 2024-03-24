const Rating = require('../models/rating')
const User = require('../models/user')
const Ingredient = require('../models/ingredient')

async function getRecipeDetails(recipe) {
  const user = await User.findById(recipe.user_id).select('-password')

  recipe.user = user ? user : { username: 'Deleted User' }

  const ratings = await Rating.find({ recipe_id: recipe._id }).lean()

  if (ratings.length > 0) {
    recipe.avgRating = ratings.reduce((acc, rating) => acc + rating.score, 0)
    recipe.avgRating /= ratings.length
    recipe.avgRating = ratings
    const users = await User.find(
      { _id: { $in: ratings.map((r) => r.user_id) } },
      '-password',
    )
    if (users) {
      recipe.ratings = ratings.map((r) => {
        const user = users.find((u) => u._id.equals(r.user_id))
        return {
          ...r,
          poster: user ? user.username : { username: 'Deleted User' },
        }
      })
    }
  } else {
    recipe.avgRating = 0
    recipe.ratings = []
  }

  const ingredients = await Ingredient.find({
    _id: { $in: recipe.ingredients.map((i) => i.ingredient_id) },
  })

  // Add the ingredient name to the recipe
  if (ingredients) {
    recipe.ingredients = recipe.ingredients.map((i) => {
      const ingredient = ingredients.find((ing) =>
        ing._id.equals(i.ingredient_id),
      )
      return { ...i, name: ingredient.name }
    })
  }

  return recipe
}

module.exports = { getRecipeDetails }
