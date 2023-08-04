import { Link } from "react-router-dom";
import style from "./Card.module.css"
import NotFound from "../NotFound/NotFound";

function Card({ data }) {
    const dietsString = data.diets ? data.diets.join(" , ") : "";
    return (
        <div className={style.card}>
            <Link to={`/detail/${data.id}`}>
            {data.image === null || !data.image ? (<NotFound image={'noimage'} />) : (
					<img className={style.img} src={data.image} alt={data.name} />
				)}
            </Link><br/>
            <div className={style.title}> {data.name}</div><br/>
            <div className={style.description}> {dietsString}</div>
        </div>
    );
}

export default Card;