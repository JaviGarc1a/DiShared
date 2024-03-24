/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredients management and retrieval
 * /ingredients:
 *   get:
 *     summary: Returns the list of all the Ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: The list of the Ingredients
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *             type: array
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *           type: object
 *           example:
 *             name: Eggs
 *     responses:
 *       200:
 *         description: The ingredient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *             type: object
 *             example:
 *                 _id: 5f7d6c6b6e4f0b0017e9b3f4
 *                 name: Eggs
 *       500:
 *         description: Internal Server Error
 *         content:
 *            application/json:
 *              schema:
 *                properties:
 *                  message:
 *                    description: The message of the response
 *              type: object
 * /ingredients/{id}:
 *   get:
 *     summary: Get a Ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient ID
 *         example: 660046e12b7446bea8c470bd
 *     responses:
 *       200:
 *        description: The Ingredient data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ingredient'
 *          type: object
 *          example:
 *              _id: 660046e12b7446bea8c470bd
 *              username: Salt
 *       401:
 *        description: Unauthorized. Token not found or invalid.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *       404:
 *        description: The Ingredient was not found
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       500:
 *        description: Internal Server Error
 *        content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *
 *   put:
 *     summary: Update a Ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ingredient ID
 *         example: 660046e12b7446bea8c470bd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *           type: object
 *           example:
 *             name: Salt
 *     responses:
 *       200:
 *        description: The Ingredient was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ingredient'
 *            type: object
 *            example:
 *                _id: 660046e12b7446bea8c470bd
 *                name: Salt
 *       401:
 *        description: Unauthorized. Token not found or invalid.
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *       404:
 *        description: The Ingredient was not found
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *       500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  description: The message of the response
 *                type: object
 *   delete:
 *     summary: Delete a ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Ingredient ID
 *         example: 660046e12b7446bea8c470bd
 *     responses:
 *       200:
 *         description: The ingredient has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       404:
 *         description: Ingredient not found
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   description: The message of the response
 *             type: object
 *
 */
var express = require('express')
var router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')

module.exports = router
