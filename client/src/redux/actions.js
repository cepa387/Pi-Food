import axios from "axios";
// import getRecipes from "../../../api/src/controllers/getRecipes";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECID = "GET_RECID";

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
            //  console.log("RESPONSE:",response);
            return dispatch({ type:GET_RECID , payload: response.data })
        }
    };