import "./Profile.css"
import {Link} from "react-router-dom";

function Profile() {
  return(
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form">
          <h1 className="profile__header">Привет, Виталий</h1>
          <div className="profile__form-input">
            <label className="profile__label">
              Имя
            </label>
            <input className="profile__input" value="Виталий"/>
          </div>
          <div className="profile__form-input">
            <label className="profile__label">
              E-mail
            </label>
            <input className="profile__input" value="pochta@yandex.ru"/>
          </div>
          <button className="profile__submit" type='submit'>Редактировать</button>
        </form>
        <Link to="/signin" className="profile__signout" >Выйти из аккаунта</Link>
      </div>
    </section>
  )
}

export default Profile;
