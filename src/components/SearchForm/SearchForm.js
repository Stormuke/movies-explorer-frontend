import "./SearchForm.css";
import React from "react";

function SearchForm() {

  return (
    <section className="search-form">
      <div className="search-form__container">
        <input className="search-form__input" placeholder="Фильм" id="queryInput" required={true}/>
        <button className="search-form__button"/>
      </div>
      <div className="search-form__wrapper">
        <button className="search-form__toggle"/>
        <p className="search-form__text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;
