import "./Profile.css";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import {useContext, useState} from "react";


function Profile({signOut, onSubmit}) {
  const user = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);

  function handleChangeName(evt) {
    setUserName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({name: userName, email: userEmail})
  }

  return(
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h1 className="profile__header">{`Привет, ${user.name}`}</h1>
          <div className="profile__form-input">
            <label className="profile__label">
              Имя
            </label>
            <input className="profile__input" value={userName} onChange={handleChangeName}/>
          </div>
          <div className="profile__form-input">
            <label className="profile__label">
              E-mail
            </label>
            <input className="profile__input" value={userEmail} onChange={handleChangeEmail}/>
          </div>
          <button className="profile__submit" type='submit'>Редактировать</button>
        </form>
        <button className="profile__signout" onClick={signOut}>Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
