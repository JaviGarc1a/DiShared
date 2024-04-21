# DiShared

RESTful API to discover and explore a universe of recipes.

![image](https://github.com/JaviGarc1a/DiShared/assets/72880234/a84e7ed8-cd46-42dd-a645-c35c88726a43)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`

`JWT_SECRET`[^1]

[^1]: Search the internet for jwt secret generator and use it as an environment variable.

## Run Locally

Clone the project

```bash
  git clone https://github.com/JaviGarc1a/DiShared.git
```

Go to the project directory

```bash
  cd DiShared
```

Install dependencies

```bash
  npm install
```

Populate database

```bash
  npm run populate
```

Start the server

```bash
  npm start
```

This project runs on [`http://localhost:3000`](http://localhost:3000). After starting the server, you can access our Swagger documentation at [`http://localhost:3000/api-doc`](http://localhost:3000/api-doc)

## API Reference

### Authentication

#### Post auth

```https
  POST /auth/login
```

**Request body**

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

### Users

#### Get all users

```https
  GET /users
```

#### Create a new user

```https
  POST /users
```

**Request body**

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### Get an user by ID

```https
  GET /users/{id}
```

**Path Parameters**

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User ID |

#### Update an user by ID

```HTTPS
  PUT /users/{id}
```

**Path Parameters**

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User ID |

**Request body**

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

#### Delete an user by ID

```https
DELETE /users/{id}
```

**Path Parameters**

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `string` | **Required**. User ID |

### Ingredients

#### Get all ingredients

```https
  GET /ingredients
```

#### Create a new ingredient

```https
  POST /ingredients
```

**Request body**

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `name`    | `string` | **Required**. Ingredient name |

#### Get an ingredient by ID

```https
  GET /ingredients/{id}
```

**Path Parameters**

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Ingredient ID |

#### Update an ingredient by ID

```HTTPS
  PUT /ingredients/{id}
```

**Path Parameters**

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Ingredient ID |

**Request body**

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `name`    | `string` | **Required**. Ingredient name |

#### Delete an ingredient by ID

```https
DELETE /ingredients/{id}
```

**Path Parameters**

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Ingredient ID |

### Recipes

#### Get all recipes

```https
  GET /recipes
```

**Query Parameters**

| Parameter    | Type     | Description                                                      |
| :----------- | :------- | :--------------------------------------------------------------- |
| `s`          | `int`    | Search term                                                      |
| `minRating`  | `int`    | Minimum rating                                                   |
| `maxRating`  | `int`    | Maximum rating                                                   |
| `minTime`    | `int`    | Minimum preparation time                                         |
| `maxTime`    | `int`    | Maximum preparation time                                         |
| `difficulty` | `string` | Difficulty of recipe. Available values: `easy`, `medium`, `hard` |

#### Create a new recipe

```https
  POST /recipes
```

**Request body**

| Parameter          | Type     | Description                                                                                                                    |
| :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `string` | **Required**. The title of the recipe                                                                                          |
| `description`      | `string` | **Required**. The description of the recipe                                                                                    |
| `steps`            | `array`  | **Required**. An array of steps for preparing the recipe                                                                       |
| `preparation_time` | `number` | **Required**. The preparation time of the recipe (in minutes)                                                                  |
| `difficulty`       | `string` | **Required**. The difficulty level of the recipe. Available values: `easy`, `medium`, `hard`                                   |
| `category`         | `string` | **Required**. The category of the recipe. Available values: `dessert`, `starter`, `main course`, `appetizer`, `drink`, `other` |
| `user_id`          | `string` | **Required**. The ID of the user who created the recipe                                                                        |
| `ingredients`      | `array`  | **Required**. An array of ingredients required for the recipe                                                                  |

#### Get a recipe by ID

```https
  GET /recipes/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Recipe ID |

#### Update a recipe by ID

```HTTPS
  PUT /recipes/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Recipe ID |

**Request body**

| Parameter          | Type     | Description                                                                                                                    |
| :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `title`            | `string` | **Required**. The title of the recipe                                                                                          |
| `description`      | `string` | **Required**. The description of the recipe                                                                                    |
| `steps`            | `array`  | **Required**. An array of steps for preparing the recipe                                                                       |
| `preparation_time` | `number` | **Required**. The preparation time of the recipe (in minutes)                                                                  |
| `difficulty`       | `string` | **Required**. The difficulty level of the recipe. Available values: `easy`, `medium`, `hard`                                   |
| `category`         | `string` | **Required**. The category of the recipe. Available values: `dessert`, `starter`, `main course`, `appetizer`, `drink`, `other` |
| `user_id`          | `string` | **Required**. The ID of the user who created the recipe                                                                        |
| `ingredients`      | `array`  | **Required**. An array of ingredients required for the recipe                                                                  |

#### Delete a recipe by ID

```https
DELETE /recipes/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Recipe ID |

#### Get a latest recipes

```https
GET /recipes/latest
```

**Query Parameters**

| Parameter | Type  | Description                  |
| :-------- | :---- | :--------------------------- |
| `limit`   | `int` | Limit of recipes to retrieve |

#### Get a popular recipes

```https
GET /recipes/popular
```

**Query Parameters**

| Parameter | Type  | Description                  |
| :-------- | :---- | :--------------------------- |
| `limit`   | `int` | Limit of recipes to retrieve |
| `year`    | `int` | Filter by year               |
| `month`   | `int` | Filter by month              |

#### Get a recipes stats

```https
GET /recipes/stats
```

#### Get a trending recipes

```https
GET /recipes/trending
```

**Query Parameters**

| Parameter | Type  | Description                  |
| :-------- | :---- | :--------------------------- |
| `limit`   | `int` | Limit of recipes to retrieve |

#### Get a user's recipe by username

```https
GET /recipes/user/{username}
```

**Path Parameters**

| Parameter  | Type     | Description                                                  |
| :--------- | :------- | :----------------------------------------------------------- |
| `username` | `string` | **Required**. Username of the user whose recipes to retrieve |

#### Get a recipe without some ingredients

```https
GET /recipes/wo-ingredients
```

**Query Parameters**

| Parameter | Type    | Description                          |
| :-------- | :------ | :----------------------------------- |
| `ings`    | `array` | **Required**. Ingredients name array |

#### Get a recipe with ingredients

```https
GET /recipes/ingredients
```

**Query Parameters**

| Parameter | Type    | Description                          |
| :-------- | :------ | :----------------------------------- |
| `ings`    | `array` | **Required**. Ingredients name array |

#### Get a recipe similars by ID

```https
GET /recipes/similar/{id}
```

**Path Parameters**

| Parameter | Type  | Description             |
| :-------- | :---- | :---------------------- |
| `id`      | `int` | **Required**. Recipe ID |

#### Get a recipe by user and category

```https
GET /recipes/user/{id}/category/{category}
```

**Path Parameters**

| Parameter  | Type     | Description                                                                                                                    |
| :--------- | :------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `id`       | `int`    | **Required**. User ID                                                                                                          |
| `category` | `string` | **Required**. The category of the recipe. Available values: `dessert`, `starter`, `main course`, `appetizer`, `drink`, `other` |

### Ratings

#### Get all ratings

```https
  GET /ratings
```

#### Create a new rating

```https
  POST /ratings
```

**Request body**

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `score`     | `int`    | **Required**. Score of the recipe   |
| `comment`   | `string` | **Required**. Comment on the recipe |
| `recipe_id` | `string` | **Required**. Recipe ID             |

#### Get a rating by ID

```https
  GET /ratings/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Rating ID |

#### Update a rating by ID

```HTTPS
  PUT /ratings/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Rating ID |

**Request body**

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `score`   | `int`    | **Required**. Score of the recipe   |
| `comment` | `string` | **Required**. Comment on the recipe |

#### Delete an rating by ID

```https
DELETE /ratings/{id}
```

**Path Parameters**

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Rating ID |

## Authors

- [@JaviGarc1a](https://www.github.com/JaviGarc1a)
- [@AntonioRodriguezRuiz](https://www.github.com/AntonioRodriguezRuiz)
