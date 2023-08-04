import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BusRecipes } from "../../redux/actions";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(BusRecipes());
  }, [dispatch]); 

  return (
    <div className={style.backgro}>
      <CardsContainer recipes={recipes}/>
    </div>
  );
}
