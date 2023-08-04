import { GET_RECIPES } from "./actions";
import { GET_DIETS } from "./actions";
import { GET_RECID } from "./actions";

const initialState = {
    recipes: [],
    diets: [],
    recipeid:[],
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_RECIPES:
            return { ...state, recipes: action.payload };
            case GET_DIETS:
                return{ ...state, diets:action.payload};
                case GET_RECID:
                    return{...state, recipeid:action.payload }
        default:
            return { ...state };
    }

}

export default rootReducer;