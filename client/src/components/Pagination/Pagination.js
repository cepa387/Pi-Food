import React from "react";
import style from "../CardsContainer/CardsContainer.module.css"


export const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalRecipes / recipesPerPage)

  for (let i = 1; i <= numOfPages ; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className= {style.paginacion} >
        {pageNumbers.map((num) => (
          <div key={num} >
            <button onClick={(e) => paginate(e, num)}>
              {num}
            </button>
          </div>
        ))}
    </nav>
  );
};