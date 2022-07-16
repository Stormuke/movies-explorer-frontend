import "./Preloader.css"

function Preloader({ addMovies }) {
  return(
    <div className="preloader">
      <button onClick={() => addMovies()} className="preloader__button">Еще</button>
    </div>
  )
}

export default Preloader;
