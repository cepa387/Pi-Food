require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db.js');

async function recipesName(req, res) {
    try {
        const { name } = req.query;
        console.log(`Esto sale ${name}`);

        let reciDB = await Recipe.findAll({
            include: {
                model: Diets,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        if (reciDB) {
            var recipesDBFull = reciDB.map((recipe) => {
                const { id, name, image, healthScore, sumarry, steps, diets } = recipe;

                const recipeDiets = diets.map((diet) => diet.name).join(", ");
                return { id, name, image, healthScore, sumarry, steps, diets: recipeDiets };
            });
        }

        const { data } = await axios(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);

        const apiRecipes = data.results.filter(coincidence => coincidence.title.toLowerCase().includes(name.toLowerCase())).map(recipe => { //las busca independientemente de mayúsculas o minúsculas.
            const instructions = recipe.analyzedInstructions && recipe.analyzedInstructions[0] ? recipe.analyzedInstructions[0].steps.map(step => step.step) : [];
            const diets = recipe.diets || recipe.Diets.map(diet => diet.name);
            return {
                id: recipe.id,
                name: recipe.title,
                image: recipe.image,
                summary: recipe.summary.replace(/<[^>]*>/g, ''),
                healthScore: recipe.healthScore,
                steps: instructions,
                diets
            }
        });
        let getDbByName = recipesDBFull.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        console.log("ESTO SALE:::", getDbByName)
        res.status(200).json(apiRecipes.concat(getDbByName));
    } catch (error) {
        console.error("Error in recipesName function:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = recipesName;
