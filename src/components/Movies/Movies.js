import cards from "../../utils/moviesConstants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import Preloader from "../Preloader/Preloader";

function Movies() {
  return(
    <>
      <SearchForm/>
      <MoviesCards movies={cards}/>
      <Preloader/>
    </>
  )
}

export default Movies;
