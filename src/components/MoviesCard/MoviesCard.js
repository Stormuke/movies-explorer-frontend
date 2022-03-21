import "./MoviesCard.css";

function MoviesCard({title, link, duration, isLiked, owner}) {
  return(
    <section className="card">
      <img className="card__image" src={link} alt={title}/>
      <div className="card__container">
        <p className="card__text">
          {title}
        </p>
        <div className={`card__like ${isLiked ? (isLiked.length > 0 ? "card__like_type_liked" : "card__like_type_disliked") : owner && "card__like_type_delete"}`}/>
      </div>
      <p className="card__duration">
        {duration}
      </p>
    </section>
  )
}

export default MoviesCard;
