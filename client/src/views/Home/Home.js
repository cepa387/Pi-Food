import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { BusRecipes, resetAll } from "../../redux/actions";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { Filter } from "../../components/Filtrer/Filtrer";
import { Pagination } from "../../components/Pagination/Pagination";
// import {buscarGame} from "../../redux/actions";
import NavBar from '../../components/NavBar/NavBar';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);

  // const [Buscar, setBuscar] = useState("");

  //   function handleChange(e) {
  //     e.preventDefault();
  //     setBuscar(e.target.value);
  // }

  // function handleSubmit(e) {
  //     e.preventDefault();
  //     dispatch(buscarGame(Buscar))
  // }

  useEffect(() => {
    dispatch(resetAll());
    dispatch(BusRecipes());
  }, [dispatch]);

  // Filtrado y Ordenado
  let allRecipes;
  filterBy === "All" && orderBy === "Select"
    ? (allRecipes = recipes)
    : (allRecipes = filteredRecipes);


  // Paginacion
  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }


  const [page, setPage] = useState(1);
  const [recipesPerPage] = useState(9);

  let lastCardPerPage = page * recipesPerPage; //Se calcula el índice del último videojuego que se mostrará en la página actual multiplicando page por videogamesPerPage.
  let firtsCardPerPage = lastCardPerPage - recipesPerPage; //  Se calcula el índice del primer videojuego que se mostrará en la página actual restando 
  let currentPageGames = allRecipes.slice(firtsCardPerPage, lastCardPerPage);


  return (
    <div className={style.backgro}>
      {/* <NavBar  /> */}
      <Filter paginate={paginate} />
      <CardsContainer recipes={currentPageGames} />
      <Pagination
                recipesPerPage={recipesPerPage}
                totalRecipes={allRecipes.length}
                paginate={paginate}
            />
    </div>
  );
}
