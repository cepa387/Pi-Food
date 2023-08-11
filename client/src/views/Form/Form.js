import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipes, getDiets, getdiets } from "../../redux/actions";
import style from "./Form.module.css";

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

  const [error, setError] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: "",
  });

  useEffect(() => {
    dispatch(getdiets());
  }, []);

  const validateField = (name, value) => {
    if (!value) {
      setError((prevError) => ({ ...prevError, [name]: "Este campo es requerido" }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
  };

  const ChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "diets") {
      const arr = reci[name];
      setReci({
        ...reci,
        [name]: arr.concat(value),
      });
    } else {
      setReci({
        ...reci,
        [name]: value,
      });
    }

    validateField(name, value);
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
    const fieldNames = Object.keys(obj);
    let isValid = true;

    fieldNames.forEach((fieldName) => {
      if (!obj[fieldName]) {
        setError((prevError) => ({ ...prevError, [fieldName]: "Este campo es requerido" }));
        isValid = false;
      }
    });

    if (obj.healthScore > 100 || obj.healthScore < 0) {
      setError((prevError) => ({ ...prevError, healthScore: "El campo healthScore debe ser un número entre 0 y 100" }));
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    dispatch(postRecipes(obj));
    e.target.reset();
    alert("¡Comida creada exitosamente!");

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
      <h1>Crear Comida</h1>
      <form onChange={(e) => ChangeInput(e)} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label>Nombre: </label>
            <input type="text" name="name" value={reci.name}></input>
            {error.name && <p>{error.name}</p>}
          </div>
          <div>
            <label>Resumen del plato: </label>
            <input type="text" name="summary" value={reci.summary}></input>
            {error.summary && <p>{error.summary}</p>}
          </div>
          <div>
            <label>health score: </label>
            <input type="number" name="healthScore" value={reci.healthScore}></input>
            {error.healthScore && <p>{error.healthScore}</p>}
          </div>
          <div>
            <label>Pasos: </label>
            <input type="text" name="steps" value={reci.steps}></input>
            {error.steps && <p>{error.steps}</p>}
          </div>
          <div>
            <label>Imagen URL: </label>
            <input type="text" name="image" value={reci.image}></input>
            {error.image && <p>{error.image}</p>}
          </div>
          <br />
          <div className={style.formcontainercolumn}>
            <label>Diets: </label>
            <br />
            <br />
            <div>
              <div>
                {diets1.map((die) => (
                  <div key={die.id}>
                    <input
                      type="checkbox"
                      name="diets"
                      value={die.diet}
                      checked={reci.diets.includes(die.diet)}
                    ></input>
                    <label>{die.diet}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button type="submit">¡Crear!</button>
        </div>
      </form>
    </div>
  );
}
