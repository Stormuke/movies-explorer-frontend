import {Link, useLocation} from "react-router-dom";
import "./Header.css"

function Header() {
  const pathName = useLocation();

  return (
    (pathName.pathname === "/" ||
      pathName.pathname === "/movies" ||
      pathName.pathname === "/saved-movies" ||
      pathName.pathname === "/profile") &&
    <section className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={() => pathName}/>
        {pathName.pathname !== "/" &&
        <div className="header__navigation">
          <Link className="header__button" to="/movies" onClick={() => pathName}>Фильмы</Link>
          <Link className="header__button" to="/saved-movies" onClick={() => pathName}>Сохранённые фильмы</Link>
        </div>
        }
      </div>
      {pathName.pathname !== "/" ?
      <Link className="header__button header__button_type_dark" to='/profile' onClick={() => pathName}>
        Аккаунт
      </Link> :
      <div className="header__container">
        <Link to="/signup" className="header__button">Регистрация</Link>
        <Link to="/signin" className="header__button header__button_type_signin">Войти</Link>
      </div>}

    </section>
  )
}

export default Header;
