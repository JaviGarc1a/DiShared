const Recipe = require('../models/recipe')

async function getUserRecipes(recipeIds) {
  const recipes = await Promise.all(
    recipeIds.map(async (recipeId) => {
      const recipe = await Recipe.findById(recipeId)
      return recipe
    })
  )
  return recipes
}

module.exports = { getUserRecipes }
