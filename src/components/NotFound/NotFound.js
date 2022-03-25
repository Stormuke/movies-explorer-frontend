import "./NotFound.css";
import {Link} from "react-router-dom";

function NotFound() {
  return(
    <section className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__description">Страница не найдена</p>
      <Link to="/" className="not-found__link" >Назад</Link>
    </section>
  )
}

export default NotFound;
