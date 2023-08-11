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

router.get('/recipes', BusRecipes);
router.get('/recipes/name', RecipesName);
router.get('/recipes/:idRecipe', Recipesid);
router.post('/recipes', CreaRecipes)
router.get('/diets', getDiets);

module.exports = router;
