require('dotenv').config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY, URL } = process.env;


const Recipesid = async (req, res) => {
    const { idRecipe } = req.params;

    try {

        let dbRecipe;

        if (idRecipe.toString().includes("-")) {
            dbRecipe = await Recipe.findByPk(
                idRecipe,
                { include: { model: Diets, attributes: ['name'] }, }
            ); if (!dbRecipe) {
                res.status(404).json({ error: "Receta no encontrada" });
                return;
            }

            // Mapeamos las dietas para obtener solo sus nombres
            const diets = dbRecipe.Diets.map(diet => diet.name);

            const associatedDiet = {
                id: dbRecipe.id,
                name: dbRecipe.name,
                image: dbRecipe.image,
                summary: dbRecipe.summary,
                healthScore: dbRecipe.healthScore,
                steps: dbRecipe.steps,
                diets: diets,
            };

            res.status(200).json(associatedDiet);
        } else {
            const response = await axios.get(`${URL}/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
            const filteredRecipe = response.data; // Actualiza aquí para obtener directamente los datos de la respuesta.
            const deleteTags = filteredRecipe.summary.replace(/<[^>]*>/g, '');
            const stepByStep = filteredRecipe.analyzedInstructions.length > 0
                ? filteredRecipe.analyzedInstructions[0].steps.map(step => step.step)
                : ["Esta receta no trae información Steps de la Api"];
            const associatedDiet = {
                id: filteredRecipe.id,
                name: filteredRecipe.title,
                image: filteredRecipe.image,
                summary: deleteTags,
                healthScore: filteredRecipe.healthScore,
                steps: stepByStep,
                diets: filteredRecipe.diets
            }
            res.status(200).json(associatedDiet);
        }

    } catch (error) {

        res.status(404).send(error.message);
    }
}
module.exports = Recipesid;
