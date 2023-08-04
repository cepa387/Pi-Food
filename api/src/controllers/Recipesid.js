require('dotenv').config();
const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY, URL } = process.env;


const Recipesid = async (req, res) => {
    const { idRecipe } = req.params;

    console.log("aja carlos:::", idRecipe)
    try {

        // if (idRecipe.toString().includes("-")) {
        //     const searchDatabaseRecipe = await Recipe.findOne({
        //         where: { id: idRecipe },
        //         include: { model: Diets, attributes: ['name'] },
        //     });

        //     if (searchDatabaseRecipe) {

        //         const { id, name, image, summary, healthScore, steps } = searchDatabaseRecipe;

        //         const associatedDiet = {
        //             id: id,
        //             name: name,
        //             image: image,
        //             summary: summary,
        //             healthScore: healthScore,
        //             steps: steps,
        //             diets: searchDatabaseRecipe.Diets.map((diet) => diet.name)
        //         }
        //         return res.status(200).json(associatedDiet);
        //     }
        // }



        // const  dato  = (await axios(`${URL}/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true`)); // agregué ${idRecipe}
        // console.log("DATAAA:",dato)
        // const filteredRecipe = dato.results.find(diet => diet.id === +idRecipe)
        
        // if (!filteredRecipe) {
        //     return res.status(400).send(`No hay recetas con el id: ${idRecipe}`)
        // }

        // const deleteTags = filteredRecipe.summary.replace(/<[^>]*>/g, '');

        // const stepByStep = dato.results.find(step => step.id === +idRecipe).analyzedInstructions[0].steps.map(step => step.step);

        // const associatedDiet = {
        //     id: filteredRecipe.id,
        //     name: filteredRecipe.title,
        //     image: filteredRecipe.image,
        //     summary: deleteTags,
        //     healthScore: filteredRecipe.healthScore,
        //     steps: stepByStep,
        //     diets: filteredRecipe.diets
        // }

        // return res.status(200).json(associatedDiet);

        let dbgame;

        if(idRecipe.toString().includes("-")){
          dbgame = await Recipe.findByPk(
            idRecipe,
            {include: {model:Diets,attributes:['name']},}
          )
          res.status(200).json(dbgame)
      }else {
        const response = await axios.get(`${URL}/recipes/${idRecipe}/information?apiKey=${API_KEY}&includeNutrition=true`);
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
