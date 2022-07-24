import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";

function Movies({movieCards, onSave, savedMovies, handleSearch, durationFilter, listLength, addMovies, onDelete, currentUser}) {

  return (
    <>
      <SearchForm handleSearch={handleSearch} durationFilter={durationFilter}/>
      <MoviesCards movieCards={movieCards} onSave={onSave} savedMovies={savedMovies} listLength={listLength}
                   addMovies={addMovies} onDelete={onDelete} currentUser={currentUser}/>
    </>
  )
}

export default Movies;
