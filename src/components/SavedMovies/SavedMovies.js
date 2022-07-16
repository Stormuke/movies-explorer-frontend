import MoviesCards from "../MoviesCards/MoviesCards";
import SearchForm from "../SearchForm/SearchForm";
import React from "react";

function SavedMovies({movieCards, onDelete, listLength, handleSearch, durationFilter}) {

  return (
    <>
      <SearchForm handleSearch={handleSearch} durationFilter={durationFilter}/>
      <MoviesCards movieCards={movieCards} onDelete={onDelete} listLength={listLength}/>
    </>
  )
}

export default SavedMovies;
