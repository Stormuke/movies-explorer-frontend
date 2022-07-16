import {Link, useLocation} from "react-router-dom";
import "./Header.css"

function Header({onSideBarOpen, isLogged, useWindowDimensions}) {

  const pathName = useLocation();

  const {width} = useWindowDimensions()
  return (
    (pathName.pathname === "/" ||
      pathName.pathname === "/movies" ||
      pathName.pathname === "/saved-movies" ||
      pathName.pathname === "/profile") &&
    <section className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={() => pathName}/>
        {isLogged &&
        (width >= 1280 && <div className="header__navigation">
          <Link className="header__button" to="/movies" onClick={() => pathName}>Фильмы</Link>
          <Link className="header__button" to="/saved-movies" onClick={() => pathName}>Сохранённые фильмы</Link>
        </div>)}
      </div>
      {!isLogged ?
        <div className="header__container">
          <Link to="/signup" className="header__button">Регистрация</Link>
          <Link to="/signin" className="header__button header__button_type_signin">Войти</Link>
        </div> :
        (width >= 1280 ?
          <Link className="header__button header__button_type_dark" to='/profile' onClick={() => pathName}>
            Аккаунт
          </Link> : <button className="header__burger" onClick={onSideBarOpen}/>)
      }

    </section>
  )
}

export default Header;
