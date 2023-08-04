import React from "react";
import { Link } from "react-router-dom/"
import style from "./NavBar.module.css"


const NavBar = () => {
    return (
        <div className={style.navega}>

            <Link to="/">INICIO</Link>
            <Link to="/home">HOME</Link>
            <input  placeholder="Buscar Food..." type="text" ></input>
            <button type="submit"   > Buscar! </button>
            <Link to="/created">CREAR FOOD</Link>
            <Link to="/About">ABOUT</Link>
        </div>
    )
}

export default NavBar;