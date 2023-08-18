import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipes, getdiets } from "../../redux/actions";
import style from "./Form.module.css";
import Card from "../../components/Card/Card";

export default function Create({recipes}) {
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

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    dispatch(getdiets());
  }, [dispatch]);

  useEffect(() => {
    const isValid = Object.values(error).every((errorMsg) => errorMsg === "");
    setIsFormValid(isValid);
  }, [error]);

  const validateField = (name, value) => {
    if (!value) {
      setError((prevError) => ({ ...prevError, [name]: "Este campo es requerido" }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
  };

  const validateName = (name) => {
    if (!name || name.length < 5 || name.length > 100 || /[^a-zA-Z0-9\s]/.test(name)) {
      setError((prevError) => ({ ...prevError, name: "El nombre debe tener entre 5 y 100 caracteres y no contener caracteres especiales" }));
    } else {
      setError((prevError) => ({ ...prevError, name: "" }));
    }
  };

  const validateSummary = (summary) => {
    if (!summary || summary.length < 5 || summary.length > 500) {
      setError((prevError) => ({ ...prevError, summary: "El resumen debe tener entre 5 y 500 caracteres" }));
    } else {
      setError((prevError) => ({ ...prevError, summary: "" }));
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

    if (name === "name") {
      validateName(value);
    } else if (name === "summary") {
      validateSummary(value);
    } else {
      validateField(name, value);
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
          <button type="submit" disabled={!isFormValid}>¡Crear!</button>
        </div>
      </form>
      {<Card data={reci} />}
    </div>
    
  );
}
