import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Preloader from "../Preloader/Preloader";

function Movies({movieCards, onSave, savedMovies}) {
  return(
    <>
      <SearchForm/>
      <MoviesCards movieCards={movieCards} onSave={onSave} savedMovies={savedMovies}/>
      <Preloader/>
    </>
  )
}

export default Movies;
