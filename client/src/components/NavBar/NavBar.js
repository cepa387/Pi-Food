import React from "react";
import { Link } from "react-router-dom/"
import style from "./NavBar.module.css"
import {useState } from "react";
import { useDispatch} from "react-redux";
import { buscarRecipe } from "../../redux/actions";


const NavBar = ({setPage}) => {

    const dispatch = useDispatch();
    const[Buscar, setBuscar] = useState("");

    function handleChange(e){
        e.preventDefault(); 
        setBuscar(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(buscarRecipe(Buscar))
        setPage(1);
        setBuscar('');
    }
    



    return (
        <div className={style.navega}>

            <Link to="/">INICIO</Link>
            <Link to="/home">HOME</Link>
            <input onChange={handleChange} value={Buscar} placeholder="Buscar Food..." type="text" ></input>
            <button type="submit" onClick={handleSubmit}> Buscar! </button>
            <Link to="/created">CREAR FOOD</Link>
            <Link to="/About">ABOUT</Link>
        </div>
    )
}

export default NavBar;