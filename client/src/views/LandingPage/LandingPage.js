import { Link } from "react-router-dom";
import style from "./LandingPage.module.css"

const LandingPage = () => {
    return (
        <div className={style.background}>
            <div className = {style.title}>
                <h2>Welcome to Food</h2>
                <Link to ="/Home">
                    <button type ="submit">INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;