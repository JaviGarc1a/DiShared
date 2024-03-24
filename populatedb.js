#! /usr/bin/env node

const userArgs = process.argv.slice(2)

const User = require('./models/user')
const Ingredient = require('./models/ingredient')
const Recipe = require('./models/recipe')
const Rating = require('./models/rating')

const users = []
const ingredients = []
const recipes = []
const ratings = []

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoDB = process.env.DB_URL || userArgs[0]

main().catch((err) => console.log(err))

async function main() {
  console.log('Debug: About to connect')
  await mongoose.connect(mongoDB)
  console.log('Debug: Should be connected?')
  await createUsers()
  await createIngredients()
  await createRecipes()
  await relateUsersRecipes()
  await createRatings()
  console.log('Debug: Closing mongoose')
  mongoose.connection.close()
}

// We pass the index to the ...Create functions so that, for example,
// inrgedient[0] will always be the Salt, regardless of the order
// in which the elements of promise.all's argument complete.
async function ingredientCreate(index, name) {
  const ingredient = new Ingredient({ name })
  await ingredient.save()
  ingredients[index] = ingredient
  console.log('Debug: Ingredient created')
}

async function createIngredients() {
  await Promise.all([
    ingredientCreate(0, 'Salt'),
    ingredientCreate(1, 'Pepper'),
    ingredientCreate(2, 'Water'),
    ingredientCreate(3, 'Sugar'),
    ingredientCreate(4, 'Flour'),
    ingredientCreate(5, 'Eggs'),
    ingredientCreate(6, 'Olive Oil'),
  ])
}

async function userCreate(
  index,
  username,
  email,
  password,
  role,
  recipes = [],
) {
  const user = new User({ username, email, password, role, recipes })
  await user.save()
  users[index] = user
  console.log('Debug: User created')
}

async function createUsers() {
  await Promise.all([
    userCreate(0, 'Alvaro', 'alvaro@gmail.com', 'Password123.', 'admin'),
    userCreate(1, 'Bobby', 'bobby@gmail.com', 'Password123.'),
    userCreate(2, 'Charlie', 'charlie@gmail.com', 'Password123.'),
    userCreate(3, 'Diana', 'diana@gmail.com', 'Password123.'),
    userCreate(4, 'Elena', 'elena@gmail.com', 'Password123.'),
    userCreate(5, 'Fernando', 'fernando@gmail.com', 'Password123.'),
  ])
}

async function recipeCreate(
  index,
  title,
  description,
  steps,
  preparation_time,
  difficulty,
  user_id,
  ingredients,
) {
  const recipe = new Recipe({
    title,
    description,
    steps,
    preparation_time,
    difficulty,
    user_id,
    ingredients,
  })
  await recipe.save()
  recipes[index] = recipe
  console.log('Debug: Recipe created')
}

async function createRecipes() {
  await Promise.all([
    recipeCreate(
      0,
      'Scrambled eggs',
      'Scrambled eggs are a quick and easy breakfast dish that can be customized with a variety of ingredients.',
      [
        '1. Crack the desired number of eggs into a bowl',
        '2. Add a pinch of salt and pepper to taste.',
        '3. Beat the eggs until well combined.',
        '4. Heat a non-stick skillet over medium heat',
        '5. Add butter or oil if desired.',
        '6. Pour the beaten eggs into the skillet.',
        '7. Stir gently with a spatula as the eggs cook, until they reach the desired consistency.',
        '8. Serve hot.',
      ],
      5,
      'easy',
      users[0],
      [
        { ingredient_id: ingredients[5], quantity: 2, unit: 'unit' },
        { ingredient_id: ingredients[0], quantity: 1, unit: 'grams' },
        { ingredient_id: ingredients[1], quantity: 1, unit: 'grams' },
      ],
    ),
    recipeCreate(
      1,
      'Boiled eggs',
      'Boiled eggs are a simple and versatile dish that can be enjoyed on their own or used in a variety of recipes.',
      [
        '1. Place the eggs in a saucepan and cover with water.',
        '2. Bring the water to a boil over medium-high heat.',
        '3. Once the water is boiling, remove the pan from the heat and cover with a lid.',
        '4. Let the eggs sit in the hot water for: \n \
          - 4 minutes for soft-boiled eggs, \n \
          - 6 minutes for medium-boiled eggs, \n \
          - 10 minutes for hard-boiled eggs',
        '5. Remove the eggs from the water and place them in a bowl of ice water to cool.',
        '6. Peel and serve.',
      ],
      5,
      'easy',
      users[1],
      [{ ingredient_id: ingredients[5], quantity: 1, unit: 'unit' }],
    ),
    recipeCreate(
      2,
      'Fried eggs',
      'Fried eggs are a classic breakfast dish that can be prepared in a variety of ways.',
      [
        '1. Heat a non-stick skillet over medium heat.',
        '2. Add butter or oil to the skillet.',
        '3. Crack the eggs into the skillet.',
        '4. Cook until the whites are set and the yolks are still runny.',
        '5. Season with salt and pepper to taste.',
        '6. Serve hot.',
      ],
      5,
      'easy',
      users[2],
      [
        { ingredient_id: ingredients[5], quantity: 2, unit: 'unit' },
        { ingredient_id: ingredients[6], quantity: 1, unit: 'teaspoon' },
      ],
    ),
    recipeCreate(
      3,
      'Poached eggs',
      'Poached eggs are a delicate and delicious dish that can be enjoyed on their own or used to top salads, toast, and more.',
      [
        '1. Fill a saucepan with water and bring to a simmer.',
        '2. Add a splash of vinegar to the water.',
        '3. Crack the eggs into a small bowl.',
        '4. Gently slide the eggs into the simmering water.',
        '5. Cook for 3-4 minutes, until the whites are set but the yolks are still runny.',
        '6. Remove the eggs with a slotted spoon and drain on a paper towel.',
        '7. Serve hot.',
      ],
      5,
      'easy',
      users[3],
      [{ ingredient_id: ingredients[5], quantity: 2, unit: 'unit' }],
    ),
    recipeCreate(
      4,
      'Baked eggs',
      'Baked eggs are a simple and delicious dish that can be customized with a variety of ingredients.',
      [
        '1. Preheat the oven to 350°F (180°C).',
        '2. Grease a baking dish with butter or oil.',
        '3. Crack the eggs into the baking dish.',
        '4. Season with salt and pepper to taste.',
        '5. Bake for 10-15 minutes, until the whites are set but the yolks are still runny.',
        '6. Serve hot.',
      ],
      5,
      'easy',
      users[4],
      [{ ingredient_id: ingredients[5], quantity: 2, unit: 'unit' }],
    ),
    recipeCreate(
      5,
      'Omelette',
      'Omelettes are a versatile and delicious dish that can be customized with a variety of fillings.',
      [
        '1. Crack the desired number of eggs into a bowl.',
        '2. Add a splash of milk and a pinch of salt and pepper.',
        '3. Beat the eggs until well combined.',
        '4. Heat a non-stick skillet over medium heat.',
        '5. Add butter or oil to the skillet.',
        '6. Pour the beaten eggs into the skillet.',
        '7. Cook until the eggs are set but still slightly runny.',
        '8. Add desired fillings (cheese, vegetables, etc.) to one half of the omelette.',
        '9. Fold the other half of the omelette over the fillings.',
        '10. Slide the omelette onto a plate and serve hot.',
      ],
      5,
      'easy',
      users[5],
      [
        { ingredient_id: ingredients[5], quantity: 2, unit: 'unit' },
        { ingredient_id: ingredients[0], quantity: 1, unit: 'grams' },
        { ingredient_id: ingredients[1], quantity: 1, unit: 'grams' },
      ],
    ),
  ])
}

async function relateUsersRecipes() {
  users[0].recipes.push(recipes[0])
  users[1].recipes.push(recipes[1])
  users[2].recipes.push(recipes[2])
  users[3].recipes.push(recipes[3])
  users[4].recipes.push(recipes[4])
  users[5].recipes.push(recipes[5])
  await Promise.all([
    users[0].save(),
    users[1].save(),
    users[2].save(),
    users[3].save(),
    users[4].save(),
    users[5].save(),
  ])
}

async function ratingCreate(index, score, comment, user_id, recipe_id) {
  const rating = new Rating({ score, comment, user_id, recipe_id })
  await rating.save()
  ratings[index] = rating
  console.log('Debug: Rating created')
}

async function createRatings() {
  await Promise.all([
    ratingCreate(0, 5, 'Delicious!', users[0], recipes[0], new Date()),
    ratingCreate(1, 4, 'Yummy!', users[1], recipes[1], new Date()),
    ratingCreate(2, 3, 'Not too bad', users[2], recipes[2], new Date()),
    ratingCreate(3, 2, 'Could be better', users[3], recipes[3], new Date()),
    ratingCreate(4, 1, 'Not my favorite', users[4], recipes[4], new Date()),
    ratingCreate(5, 0, 'Disgusting', users[5], recipes[5], new Date()),
  ])
}
