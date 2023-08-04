const {Recipe, Diets}= require("../db");


const CreaRecipes = async (req, res) => {

    try {

        const {name, image, summary, healthScore, steps, diets} = req.body; // hago el post con todo lo que me llegará por body.
        

        if(!name || !image || !summary || !healthScore || !steps || !diets){
            return res.status(400).send("Faltan datos por completar");
        }

        const existingRecipe = await Recipe.findOne({ where: { name } });
        if (existingRecipe) {
            return res.status(400).send(`Ya existe una receta con el nombre: ${name}`);
        }
        if(healthScore.length < 0 || healthScore > 100 ){
            return res.status(400).send(`El HealthScore tiene que estar en el rango de 0 a 100`);
        }

        const createRecipe = await Recipe.create({name, image, summary, healthScore, steps}) // creo mi receta

        const dietsArray = diets;  
        
        for (let i = 0; i < dietsArray.length; i++) {
            const dietName = dietsArray[i];
            const existingDiet = await Diets.findOne({ where: { name: dietName } });
          
            if (existingDiet) {
              await createRecipe.addDiet(existingDiet);
            } else {
              const newDiet = await Diets.create({ name: dietName });
              await createRecipe.addDiet(newDiet);
            }
          }
          
        
        const response = {
            id: createRecipe.id,
            name: createRecipe.name,
            image: createRecipe.image,
            summary: createRecipe.summary,
            healthScore: createRecipe.healthScore,
            steps: createRecipe.steps,
            diets: diets
          };

        return res.status(201).json(response)

    } catch (error) {
        
        res.status(404).send(error.message)

    }

}

module.exports = CreaRecipes;