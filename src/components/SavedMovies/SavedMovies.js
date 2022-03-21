import savedCards from "../../utils/savedMoviesConstants";
import MoviesCards from "../MoviesCards/MoviesCards";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <>
      <SearchForm/>
      <MoviesCards movies={savedCards}/>
    </>
  )
}

export default SavedMovies;
