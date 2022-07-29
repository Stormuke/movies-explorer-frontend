import "./MoviesCard.css";
import {useState} from "react";
import {useLocation} from "react-router-dom";

function MoviesCard({card, onSave, onDelete, savedMovies, currentUser}) {
  const location = useLocation();
  const [isHover, setIsHover] = useState(false)
  return (
        <section className="card" onMouseEnter={(evt) => {
          evt.stopPropagation()
          setIsHover(true)
        }} onMouseLeave={(evt) => {
          evt.stopPropagation()
          setIsHover(false)
        }}>
          <a href={card.trailerLink} target="_blank">
            <img className="card__image"
                 src={location.pathname === "/movies" ? `https://api.nomoreparties.co${card.image.url}` : card.image}
                 alt={card.nameRU}
            />
          </a>
          <div className="card__container">
            <p className="card__text">
              {card.nameRU}
            </p>
            {location.pathname === "/movies" && <button
              className={`card__like ${(savedMovies.some((m) => m.movieId === card.id) ? "card__like_type_liked" : "card__like_type_disliked")}`}
              onClick={() => {
                onSave(card)
              }
              }
            />}
            {(location.pathname === "/saved-movies") && <button
              className={`card__like ${isHover && 'card__like_type_delete'}`}
              onClick={() => {
                onDelete(card)
              }
              }
            />}

          </div>
          <p className="card__duration">
            {card.duration}
          </p>
        </section>
  )
}

export default MoviesCard;
