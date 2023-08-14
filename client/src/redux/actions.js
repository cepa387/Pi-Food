import axios from "axios";
// import getRecipes from "../../../api/src/controllers/getRecipes";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECID = "GET_RECID";
export const RESET = "RESET"
export const FILTER_BY_DIETS = "FILTER_BY_DIETS"
export const ORDER_ASC_HEALTH = "ORDER_ASC_HEALTH"
export const ORDER_DESC_HEALTH = "ORDER_DESC_HEALTH"
export const ORDER_BY_CREATOR = "ORDER_BY_CREATOR"
export const GET_SEARCH = "GET_SEARCH"

export const BusRecipes = () => {
    return async function (dispatch) {
        const apiData = await axios.get(`http://localhost:3001/recipes`);        
        const recipes = apiData.data;
        return dispatch({type:GET_RECIPES, payload:recipes})
    }
};

export const postRecipes = (recipe) => {
    return async function (dispatch) {
        const apiData = await axios.post(`http://localhost:3001/recipes`,recipe);
        const recip = apiData.data;
        // dispatch({type: GET_DIETS, payload:recip})
    }
};

export const getdiets = () => {
    return async function (dispatch) {
  
            const response = await axios.get(`http://localhost:3001/diets`);
            const diets = response.data;
            return dispatch({ type: GET_DIETS, payload: diets });
      
        }
    };


    export function idRecipe(id){
        return async function(dispatch){
            const response = await axios(`http://localhost:3001/recipes/${id}`)
            return dispatch({ type:GET_RECID , payload: response.data })
        }
    };

    export function buscarRecipe(name){
      return async function(dispatch){
          const response = await axios(`http://localhost:3001/recipes/name?name=${name}`)
          return dispatch({type: GET_SEARCH, payload: response.data
          })
      }
  }

    export const resetAll = (GET_RECIPES) => {
        return (dispatch) => {
            if(GET_RECIPES){
                return dispatch({type: RESET,  });
            }
          
        };
      };

      export const filterByDiets = (diets) => (dispatch, getState) => {
        const allRecipes = getState().recipes; // Obtén todas las recetas del estado
        
        let filteredRecipes = [];
      
        if (diets === "All") {
            filteredRecipes = allRecipes; // Si se selecciona "All", muestra todas las recetas
        } else {
            filteredRecipes = allRecipes.filter((recipe) =>
                (recipe.diets || []).includes(diets) // Verifica si las dietas incluyen la dieta seleccionada
            );
        }
        
        dispatch({
            type: FILTER_BY_DIETS,
            payload: {
                diets,
                recipeDiet: filteredRecipes,
            },
        });
    };
    

      export const orderAsc = (type) => (dispatch, getState) => {
        const filtered = getState().filteredRecipes;
        let recipesOrder = []
      
          if (type === "asc_name") {
            recipesOrder = filtered.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            });
          } else if (type === "asc_healthscore") {
            recipesOrder = filtered.sort(
              (a, b) => a.healthScore - b.healthScore
            );
          }
          console.log("FILTEREDDD:::",recipesOrder)
          dispatch({
            type: ORDER_ASC_HEALTH,
            payload: {
                recipesOrder,
              name: type,
            },
          });
      }

      export const orderDesc = (type) => (dispatch, getState) => {
        const filtered = getState().filteredRecipes;
        let recipesOrder = []
          
          if (type === "desc_name") {
            recipesOrder = filtered.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });
          } else if (type === "desc_healthscore") {
            recipesOrder = filtered.sort(
              (a, b) => b.healthScore - a.healthScore
            );
          }
          dispatch({
            type: ORDER_DESC_HEALTH,
            payload: {
                recipesOrder,
              name: type,
            },
          });
      }

      export const orderByCreator = (source) => (dispatch, getState) => {
        const recipes = getState().recipes.filter(function (G) {
            return G.source === source
          });
        return dispatch({
          type: ORDER_BY_CREATOR,
          payload: {
            recipes,
            source,
          },
        });
      };