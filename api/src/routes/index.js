const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDiets = require ('../controllers/getDiets');
const CreaRecipes = require ('../controllers/CreaRecipes')
const BusRecipes = require ('../controllers/BusRecipes')
const Recipesid = require ('../controllers/Recipesid')
const RecipesName = require('../controllers/RecipesName')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/diets', getDiets);
router.get('/recipes', BusRecipes);
router.get('/recipes/:idRecipe', Recipesid);
router.get('/recipes/name?=', RecipesName);
router.post('/recipes', CreaRecipes)


module.exports = router;
