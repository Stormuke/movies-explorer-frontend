import "./SearchForm.css";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({handleSearch, durationFilter}) {
  const localStorageValue = localStorage.getItem('savedSearchValue')
  const localChecked = localStorage.getItem('savedCheck')

  const [checked, setChecked] = useState(localChecked ?? '0')
  const [value, setValue] = useState(localStorageValue ?? '')
  const location = useLocation()

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setChecked('0')
    handleSearch(value)
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setChecked('0')
      handleSearch(value)
      setValue('')
    }
  }, [location])

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('savedSearchValue', value)
      localStorage.setItem('savedCheck', checked)
    }
  }, [value, checked])

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationFilter(checked)
    }
    if (location.pathname === '/movies') {
      handleSearch(localStorageValue ?? '')
      durationFilter(checked ?? '0')
    }
  }, [location, checked])


  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={(e) => handleSubmitForm(e)}>
        <input className="search-form__input" value={value} placeholder="Фильм" id="queryInput"
               onChange={(e) => setValue(e.target.value)}/>
        <button type='submit' className="search-form__button"/>
      </form>
      <div className="search-form__wrapper">
        <button type='button' className={`search-form__toggle search-form__toggle${checked === '1' ? '_on' : "_off"}`}
                onClick={() => {
                  setChecked(checked === '0' ? '1' : '0')
                  durationFilter(checked)
                }}/>
        <p className="search-form__text">Короткометражки</p>
      </div>
    </section>
  )
}

export default SearchForm;
