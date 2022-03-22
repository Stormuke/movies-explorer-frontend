import "./MoviesCard.css";
import {useState} from "react";

function MoviesCard({title, link, duration, isLiked, owner}) {
  const [isHover, setIsHover] = useState(false)
  return(
    <section className="card" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <img className="card__image" src={link} alt={title}/>
      <div className="card__container">
        <p className="card__text">
          {title}
        </p>
        <button className={`card__like ${isLiked ? (isLiked.length > 0 ? "card__like_type_liked" : "card__like_type_disliked") : isHover && "card__like_type_delete"}`}/>
      </div>
      <p className="card__duration">
        {duration}
      </p>
    </section>
  )
}

export default MoviesCard;
