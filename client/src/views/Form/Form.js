import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipes, getDiets, getdiets } from "../../redux/actions";
import style from "./Form.module.css"

export default function Create() {

    const dispatch = useDispatch();
    const diets = useSelector((store) => store.diets);
    
    const diets1 = diets && Array.isArray(diets) ? diets.slice(0, 10) : [];
    

    const [reci, setReci] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
    });

    useEffect(() => {
        dispatch(getdiets());
    }, []);



    const ChangeInput = (e) => {
        if (e.target.name === "diets") {
            const arr = reci[e.target.name];
            setReci({
                ...reci,
                [e.target.name]: arr.concat(e.target.value),
            });
        } else {
            setReci({
                ...reci,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const obj = {
            name: reci.name,
            image: reci.image,
            summary: reci.summary,
            healthScore: reci.healthScore,
            diets: reci.diets,
            steps: reci.steps,
        };

        // Validaciones
        if (!obj.name) {
            alert("El campo nombre no puede estar vacio")
            return
        }
        if (!obj.summary) {
            alert("El campo summary no puede estar vacio")
            return
        } if (!obj.steps) {
            alert("steps no puede estar vacio")
            return
        } if (obj.healthScore > 100 || obj.healthScore < 0) {
            alert("El campo healthScore debe ser un numero entre 0 a 100")
            return
        }
        dispatch(postRecipes(obj));
        e.target.reset();
        alert("Food created successfully!");
        //  dispatch(getVideogames())

        setReci({
            name: "",
            image: "",
            summary: "",
            healthScore: 0,
            steps: "",
            diets: [],
        });
    };

    return (

        <div className={style.formcontainer}>
            <h1>Crear Food</h1>
            <form
                onChange={(e) => ChangeInput(e)}
                onSubmit={(e) => handleSubmit(e)}
            >
                <div>
                    <div>
                        <label>Nombre: </label>
                        <input
                            type="text"
                            name="name"
                            value={reci.name}
                        ></input>
                    </div>
                    <div>
                        <label>Resumen del plato: </label>
                        <input
                            type="text"
                            name="summary"
                            value={reci.summary}
                        ></input>
                    </div>
                    <div>
                        <label>health score: </label>
                        <input
                            type="number"
                            name="healthScore"
                            value={reci.healthScore}
                        ></input>
                    </div>
                    <div>
                        <label>Step: </label>
                        <input
                            type="text"
                            name="steps"
                            value={reci.steps}
                        ></input>
                    </div>
                    <div>
                        <label>Imagen URL: </label>
                        <input
                            type="text"
                            name="image"
                            value={reci.image}
                        ></input>
                    </div><br/>
                    <div className={style.formcontainercolumn} >
                        <label>Diets: </label>
                        <br /><br />
                        <div >
                            <div>
                                {diets1.map((die) => (
                                    <div key={die.id}>
                                        <input
                                            type="checkbox"
                                            name="diets"
                                            value={die.diet}
                                            checked={reci.diets.includes(die.diet)}
                                        ></input>
                                        <label >{die.diet}</label>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <button type="submit">
                        Create!
                    </button>
                </div>
            </form>
        </div>
    )
}