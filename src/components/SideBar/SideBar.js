import "./SideBar.css"
import {Link, useLocation} from "react-router-dom";

function SideBar({isOpen, onClose}) {
  const pathName = useLocation();

  function handleClick() {
    onClose()
    return pathName
  }

  return(
    <section className={`side-bar${isOpen ? " side-bar_show" : ""}`}>
      <button type="button" className="side-bar__close" onClick={onClose}/>
      <div className="side-bar__container">
        <Link className="side-bar__button" to="/" onClick={handleClick}>Главная</Link>
        <Link className="side-bar__button" to="/movies" onClick={handleClick}>Фильмы</Link>
        <Link className="side-bar__button" to="/saved-movies" onClick={handleClick}>Сохранённые фильмы</Link>
      </div>
      <Link className="side-bar__button side-bar__button_type_dark" to='/profile' onClick={handleClick}>
        Аккаунт
      </Link>
    </section>
  )
}

export default SideBar;
