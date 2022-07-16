import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";

function Movies({movieCards, onSave, savedMovies, handleSearch, durationFilter, listLength, addMovies}) {

  return(
    <>
      <SearchForm handleSearch={handleSearch} durationFilter={durationFilter}/>
      <MoviesCards movieCards={movieCards} onSave={onSave} savedMovies={savedMovies} listLength={listLength} addMovies={addMovies}/>
    </>
  )
}

export default Movies;
