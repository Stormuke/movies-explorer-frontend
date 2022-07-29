import MoviesCards from "../MoviesCards/MoviesCards";
import SearchForm from "../SearchForm/SearchForm";
import React from "react";

function SavedMovies({movieCards, onDelete, listLength, handleSearch, durationFilter, addMovies, savedMovies}) {
  return (
    <>
      <SearchForm handleSearch={handleSearch} durationFilter={durationFilter}/>
      <MoviesCards movieCards={movieCards} onDelete={onDelete} listLength={listLength} addMovies={addMovies} savedMovies={savedMovies}/>
    </>
  )
}

export default SavedMovies;
