import "./Sign.css"
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../utils/formValidator";


function Sign({submit, isPending}) {

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
          <h2 className="sign__title">Добро пожаловать!</h2>
          <div className="sign__form-input">
            <label className="sign__label">
              Имя
            </label>
            <input className='sign__input' type="text" placeholder="Имя"
                   id="name-input" name="name" minLength="2" maxLength="40" required
                   onChange={handleChange} />
          </div>
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
            disabled={!isValid && isPending}
            className={`sign__submit sign__submit_type_small ${!isValid && isPending && 'sign__submit_disabled'}`}
            type='submit'>
            Зарегистрироваться
          </button>
        </form>
        <p className="sign__text">Уже зарегистрированы?
          <Link to="/signin" className="sign__button">Войти</Link>
        </p>
      </div>
    </section>
  )
}

export default Sign;
