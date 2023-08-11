require('dotenv').config();
const axios = require("axios");
const { API_KEY, URL } = process.env;
const { Recipe, Diets } = require('../db.js');
const{Op} = require('sequelize')

const recipesName = async (req, res) => {
    
    const { name } = req.query;

    
    try {
        
       const [recipesFromDatabase, apiResponse] = await Promise.all([
            Recipe.findAll({
                where:{
                    name: {
                        [Op.iLike]: `%${name}%`,
                    },
                },
                include: Diets,
            }),
            axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
       ]);

       const apiRecipes = apiResponse.data.results;

       const propertyMapping = {
        id: 'id',
        name: 'title',
        summary: 'summary',
        healthScore: 'healthScore',
        steps: 'steps',
        image:'image',
        diets: 'diets',
       }


       const propertyMappingDatabase = {
        id: 'id',
        name: 'name',
        summary: 'summary',
        healthScore: 'healthScore',
        steps: 'steps',
        image:'image',
        diets: 'diets',
       }

       const filteredApiRecipes = apiRecipes.filter((recipe)=>
       recipe.title.toLowerCase().includes(name.toLowerCase())
       );

       const combinedRecipes = [...recipesFromDatabase,...filteredApiRecipes];

       const simplifiedRecipes = combinedRecipes.map((recipe)=>{
            
        const isFromDatabase = recipe instanceof Recipe;
        const simplifiedRecipe = {};
        const mapping = isFromDatabase ? propertyMappingDatabase : propertyMapping;

        for (const key in mapping){
            simplifiedRecipe[key] = recipe[mapping[key]];
        }
        return simplifiedRecipe;

       });

       return res.status(200).json(simplifiedRecipes);

    } catch (error) {
        console.error("Error ", error);
        res.status(500).json({ error: "Error al obtener la receta" });
    }
}

module.exports = recipesName;
