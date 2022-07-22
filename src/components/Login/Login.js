import "../Sign/Sign.css"
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../utils/formValidator";


function Login({submit}) {

  const {values, handleChange, isValid} =
    useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      submit(values)
    }
  }

  return (
    <section className="sign">
      <Link to="/" className="sign__logo"/>
      <div className="sign__container">
        <form className="sign__form" onSubmit={handleSubmit}>
          <h2 className="sign__title">Рады видеть!</h2>
          <div className="sign__form-input">
            <label className="sign__label">
              Почта
            </label>
            <input className='sign__input' type="email" placeholder="Почта"
                   id="email-input" name="email" minLength="2" maxLength="40" required
                   onChange={handleChange}/>

          </div>
          <div className="sign__form-input">
            <label className="sign__label">
              Пароль
            </label>
            <input className='sign__input' type="password" placeholder="Пароль"
                   id="password-input" name="password" minLength="2" maxLength="40" required
                   onChange={handleChange}/>
          </div>
          <button
            className={`sign__submit ${!isValid && 'sign__submit_disabled'}`}
            type='submit' disabled={!isValid}>
            Войти
          </button>
        </form>
        <p className="sign__text">Ещё не зарегистрированы?
          <Link to="/signup" className="sign__button">Зарегистрироваться</Link>
        </p>
      </div>
    </section>
  )
}

export default Login;
