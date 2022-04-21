import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCards.css"

function MoviesCards({movieCards, onSave, onDelete, savedMovies}) {
  return (
    <section className="cards">
      {movieCards.map((card, id ) => {
        return (
          <div className="cards__container" key={card.id ? card.id : id}>
            <MoviesCard card={card} isLiked={card.isLiked} onSave={onSave} onDelete={onDelete} savedMovies={savedMovies}/>
          </div>

        )
      })}
    </section>
  )
}

export default MoviesCards;
