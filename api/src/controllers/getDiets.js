require('dotenv').config();
const axios = require("axios");
const { Diets, Recipe } = require("../db");
const { API_KEY, URL } = process.env;

const getDiets = async (req, res) => {
  try {
    // Obtener todas las dietas de la base de datos
    const diets = await Diets.findAll();
    

    // Si hay datos en la base de datos, mostrarlos
    if (diets.length > 0) {
      const combinedDiets = diets.map(diet => ({ id: diet.id, diet: diet.name, db: true }));
      return res.status(200).json(combinedDiets);
    }

    // Si no hay datos en la base de datos, obtener las dietas de la API y guardarlas
    const { data } = await axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const uniqueApiDiets = [...new Set(data.results.flatMap(diet => diet.diets))];

    if (uniqueApiDiets.length > 0) {
      await Diets.bulkCreate(uniqueApiDiets.map(diet => ({ name: diet })));
      const newDiets = await Diets.findAll();

      const combinedDiets = newDiets.map(diet => ({ id: diet.id, diet: diet.name, db: true }));
      return res.status(200).json(combinedDiets);
    }

    return res.status(200).json([]);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = getDiets;
