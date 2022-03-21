import "./Sign.css"
import {Link, useLocation} from "react-router-dom";

function Sign() {
  const path = useLocation();

  return(
    <section className="sign">
      <Link to="/" className="sign__logo"/>
      <div className="sign__container">
        <form className="sign__form">
          <h2 className="sign__title">{path.pathname === "/signin" ? "Рады видеть!" : "Добро пожаловать!"}</h2>
          {path.pathname === "/signup" && <div className="sign__form-input">
            <label className="sign__label">
              Имя
            </label>
            <input className='sign__input' type="text" placeholder="Имя"
                   id="name-input" name="name" minLength="2" maxLength="40" required
                   value='Василий'/>
          </div>}
          <div className="sign__form-input">
            <label className="sign__label">
              Почта
            </label>
            <input className='sign__input' type="email" placeholder="Email"
                   id="email-input" name="email" minLength="2" maxLength="40" required
                   value='pochta@yandex.ru'/>
          </div>
          <div className="sign__form-input">
            <label className="sign__label">
              Пароль
            </label>
            <input className='sign__input' type="password" placeholder="Email"
                   id="email-input" name="email" minLength="2" maxLength="40" required
                   value='pochta@yandex.ru'/>
          </div>
          <button className={`sign__submit ${path.pathname === "/signup" && "sign__submit_type_small"}`} type='submit'>{path.pathname === "/signup" ? "Зарегистрироваться" : "Войти"}</button>
        </form>
        <p className="sign__text">{path.pathname === "/signin" ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?"}
          <Link to={path.pathname === "/signup" ? "/signin" : "/signup"} className="sign__button" >{path.pathname === "/signin" ? "Зарегистрироваться" : "Войти"}</Link>
        </p>
      </div>
    </section>
  )
}

export default Sign;
