require('dotenv').config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY, URL } = process.env;


const Recipesid = async (req, res) => {
    const { idRecipe } = req.params;
    
    try {

        let dbgame;

        if (idRecipe.toString().includes("-")) {
            dbgame = await Recipe.findByPk(
                idRecipe,
                { include: { model: Diets, attributes: ['name'] }, }
            )
            res.status(200).json(dbgame)
        } else {
            const response = await axios.get(`${URL}/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
            const filteredRecipe = response.data; // Actualiza aquí para obtener directamente los datos de la respuesta.
            const deleteTags = filteredRecipe.summary.replace(/<[^>]*>/g, '');
            const stepByStep = filteredRecipe.analyzedInstructions[0].steps.map(step => step.step); // Actualiza aquí también.


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
