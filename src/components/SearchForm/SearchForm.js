import "./SearchForm.css";
import React, {useState} from "react";

function SearchForm({handleSearch, durationFilter}) {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()

    handleSearch(value)
  }

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={(e) => handleSubmitForm(e)}>
        <input className="search-form__input" value={value} placeholder="Фильм" id="queryInput" onChange={(e) => setValue(e.target.value)}/>
        <button type='submit' className="search-form__button"/>
      </form>
      <div className="search-form__wrapper">
        <button type='button' className={`search-form__toggle search-form__toggle${checked ? '_on' : "_off"}`} onClick={() => {
          setChecked(!checked)
          durationFilter(checked)
        }}/>
        <p className="search-form__text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;
