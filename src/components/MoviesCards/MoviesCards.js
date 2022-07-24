import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCards.css"
import Preloader from "../Preloader/Preloader";

function MoviesCards({movieCards, onSave, onDelete, savedMovies, listLength, addMovies, currentUser}) {
  return (
    <section className="container">
      <div className="cards">
        {movieCards.map((card, id) => {
          return (
            <div className="cards__container" key={card.id ? card.id : id}>
              <MoviesCard card={card} onSave={onSave} onDelete={onDelete}
                          savedMovies={savedMovies} currentUser={currentUser}/>
            </div>

          )
        }).slice(0, listLength)}
      </div>


      {movieCards.length === 0 ? <p>Введите название фильма в поисковой строке</p> : movieCards.length > listLength &&
        <Preloader addMovies={addMovies}/>}
    </section>
  )
}

export default MoviesCards;
