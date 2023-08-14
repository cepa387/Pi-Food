import React from "react";
import style from "../CardsContainer/CardsContainer.module.css"

export const Pagination = ({ recipesPerPage, totalRecipes, currentPage, paginate }) => {
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalRecipes / recipesPerPage);

  for (let i = 1; i <= numOfPages ; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={style.paginacion}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => paginate(num)}
          className={num === currentPage ? style.active : ""}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === numOfPages}
      >
        Siguiente
      </button>
    </nav>
  );
};
