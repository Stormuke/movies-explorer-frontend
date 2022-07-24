import "./Profile.css";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import {useContext, useEffect, useState} from "react";


function Profile({signOut, onSubmit}) {
  const user = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [disableForm, setDisableForm] = useState(true)


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

  useEffect(() => {
    if (userName !== user.name || userEmail !== user.email) {
      setDisableForm(false)
    }
     else {
      setDisableForm(true)
    }
  }, [handleChangeName, handleChangeEmail, userName, userEmail])

  return (
    <section className="profile">
      <div className="profile__container">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h1 className="profile__header">{`Привет, ${user.name}`}</h1>
          <div className="profile__form-input">
            <label className="profile__label">
              Имя
            </label>
            <input className="profile__input" value={userName} onChange={handleChangeName} name='name' type='text'/>
          </div>
          <div className="profile__form-input">
            <label className="profile__label">
              E-mail
            </label>
            <input className="profile__input" value={userEmail} onChange={handleChangeEmail} name='email' type='email'/>
          </div>
          <button className={`profile__submit ${disableForm && "profile__submit_disabled"}`} type='submit' disabled={disableForm}>Редактировать</button>
        </form>
        <button className="profile__signout" onClick={signOut}>Выйти из аккаунта</button>
      </div>
    </section>
  )
}

export default Profile;
