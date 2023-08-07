import { GET_RECIPES } from "./actions";
import { GET_DIETS } from "./actions";
import { GET_RECID } from "./actions";
import { RESET } from "./actions";
import { FILTER_BY_DIETS } from "./actions";
import { ORDER_ASC_RATING } from "./actions";
import { ORDER_DESC_RATING } from "./actions";
import { ORDER_BY_CREATOR } from "./actions";

const initialState = {
    recipes: [],
    diets: [],
    recipeid: [],
    copiaRecipes: [],
    filteredRecipes: [],
    orderBy: "Select",
    filterBy: "All",
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_RECIPES:
            return { ...state, recipes: action.payload, copiaRecipes: action.payload };
        case GET_DIETS:
            return { ...state, diets: action.payload };
        case GET_RECID:
            return { ...state, recipeid: action.payload }
        case RESET:
            return {
                ...state,
                recipes: [],
                filteredRecipes: [],
                orderBy: "Select",
                filterBy: "All",
            }
            case FILTER_BY_DIETS:
                return {
                  ...state,
                  filteredRecipes: action.payload.recipeDiet,
                  filterBy: action.payload.diet,
                };
              case ORDER_ASC_RATING:
              case ORDER_DESC_RATING:
                return {
                  ...state,
                  filteredRecipes: action.payload.recipesOrder,
                  orderBy: action.payload.name,
                };
          
              case ORDER_BY_CREATOR:
              return {
                ...state,
                filteredRecipes: action.payload.recipes,
                filterBy: action.payload.source,
              };
        default:
            return { ...state };
    }

}

export default rootReducer;