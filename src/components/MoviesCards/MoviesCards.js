import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCards.css"

function MoviesCards({movies}) {
  return (
    <section className="cards">
      {movies.map((card, id) => {
        return (
          <div className="cards__container" key={id}>
            <MoviesCard title={card.title} link={card.link} duration={card.duration} isLiked={card.isLiked} owner={card.owner}/>
          </div>

        )
      })}
    </section>
  )
}

export default MoviesCards;
