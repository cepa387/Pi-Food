import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { idRecipe } from "../../redux/actions";
// import NotFound from "../../components/notFound/notFound";
import style from "../Detail/Detail.module.css";

function RecipeDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipeid); //ojo !
    

    useEffect(() => {
        dispatch(idRecipe(id));
    }, [dispatch, id]);

    return (
        <div >
            <div className={style.card}>
                <p><strong>Id:</strong>  {recipe.id}</p>
                <p><strong>Nombre:</strong> {recipe.name}</p>

                <p>{recipe.hasOwnProperty("background_image") ?
                    (<img src={recipe.image} alt="not found" />) :
                    (<img src={recipe.image} alt="not found" />)}</p>

                <div >
                    <p><strong> summary:</strong>{recipe.summary}</p>
                    <p><strong>health score:</strong> {recipe.healthScore}</p>
                    <p><strong>Diets:</strong>   {Array.isArray(recipe.diets) ? (
                        recipe.diets.map(diet => diet).join(", ")
                    ) : (
                        "Diets data is not available"
                    )}</p>
                    <p ><strong>Steps:</strong></p> {recipe.steps}

                </div>
            </div>
        </div>
    )
}

export default RecipeDetail;