import Card from "../Card/Card";
 import Loading from "../Loading/Loading";
import style from "./CardsContainer.module.css"

export default function CardContainer({ recipes }) {
  if (!recipes || !Array.isArray(recipes) || recipes.length === 0) {
    return <Loading/>
  }

  return (
    <div className={style.container}>
      {recipes.map((data) => (
        <Card key={data.id} data={data} /> // Agregar la propiedad "key" con un valor único, en este caso, asumo que "data.id" es único para cada receta.
      ))} 
    </div>
  );
}





