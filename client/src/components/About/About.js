import React from "react"
import styles from "./About.module.css"
import { Link } from "react-router-dom"
// import NavBar from "../NavBar/NavBar"

const  About = () =>{
    
    return (
        
        <div className={styles.aboutContainer}>
        <div className={styles.about}>
           <h1>Bienvenidos a mi Proyecto Individual .</h1>
           <h2>Food</h2>
           <p>En esta app podrán visualizar recetas de comidas 
            buscandolas por su nombre, agregarlas y ordenarlas por su número
            de health score o por dietas, como tambien ver 
            información mas detallada sobre cada una haciendo clic en cada tarjeta.
           </p>
            <span>Mi nombre es Carlos Polo Arrieta, soy estudiante de Henry
                en la carrera desarrollo web full stack en su modalidad
                part-time. 
            </span>
            <p >
                <a className={styles.links} href="https://github.com/cepa387">GitHub</a>
                <a className={styles.links} href="https://www.linkedin.com/in/carlos-eduardo-polo-arrieta-1a685b7a/" >LinkedIn</a>
                {/* <a className={styles.links} href="https://t.me/Bautizitelli" >Telegram</a> */}
            </p>
                <div className={styles.div}>
                    <Link to='/home'> 
                        <button className={styles.button}>Back to home!</button> 
                    </Link> 
                </div>
             </div>
        </div>
    )
}

export default About;