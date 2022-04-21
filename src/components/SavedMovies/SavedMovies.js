import MoviesCards from "../MoviesCards/MoviesCards";
import SearchForm from "../SearchForm/SearchForm";
import React from "react";

function SavedMovies({movieCards, onDelete}) {

  return (
    <>
      <SearchForm/>
      <MoviesCards movieCards={movieCards} onDelete={onDelete}/>
    </>
  )
}

export default SavedMovies;
