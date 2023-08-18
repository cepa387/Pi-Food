import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { BusRecipes, resetAll } from "../../redux/actions";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { Filter } from "../../components/Filtrer/Filtrer";
import { Pagination } from "../../components/Pagination/Pagination";
import NavBar from '../../components/NavBar/NavBar';



export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);


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
  const handlePageChange = (num) => {
    setPage(num);
  };

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }


  const [page, setPage] = useState(1);
  
  const [recipesPerPage] = useState(9);

  let lastCardPerPage = page * recipesPerPage; //Se calcula el índice dela última receta que se mostrará en la página actual multiplicando page por recipesPerPage.
  let firtsCardPerPage = lastCardPerPage - recipesPerPage; //  Se calcula el índice del primer recipes que se mostrará en la página actual restando 
  let currentPageRecipes = allRecipes.slice(firtsCardPerPage, lastCardPerPage);


  return (
    <div className={style.backgro}>
      <NavBar setPage = {setPage} />
      <Filter paginate={paginate} />
      <CardsContainer recipes={currentPageRecipes} />
      <Pagination
                recipesPerPage={recipesPerPage}
                totalRecipes={allRecipes.length}
                currentPage={page}
                paginate={handlePageChange}
            />
    </div>
  );
}
