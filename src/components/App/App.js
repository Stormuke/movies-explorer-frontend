import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import {Route, Routes, useNavigate} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Sign from "../Sign/Sign";
import Login from "../Login/Login";
import SideBar from "../SideBar/SideBar";
import {useEffect, useState} from "react";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../utils/CurrentUserContext";
import {useWindowDimensions} from "../../utils/useWindowDimensions";

import {SMALL_RES_CARD_COUNT, HIGH_RES_CARD_ADD_COUNT, MIDDLE_RES_CARD_COUNT, SMALL_RES_CARD_ADD_COUNT, HIGH_RES_CARD_COUNT, SHORT_FILMS} from "../../utils/helpConstants";

function App() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moviesNumber, setMoviesNumber] = useState(0);
  const [listLength, setListLength] = useState(0);
  const [isLoginPending, setIsLoginPending] = useState(Boolean(false))

  /* стейты для работы с фильмами */
  const [apiFilteredFilms, setApiFilteredFilms] = useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [localApiFilms, setLocalApiFilms] = useState([]);
  const [localSavedMovies, setLocalSavedMovies] = useState([]);

  const jwt = localStorage.getItem("jwt")

  const navigate = useNavigate();

  /****************************
   *       Работа с АПИ       *
   ***************************/

  /* Проверка логина */
  useEffect(() => {
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
          }
        })
        .catch((err) => {
          alert(`Не удалось получить токен: ${err}`)
        })
    }
  }, [jwt])

  /* Установка юзера если есть токен */
  useEffect(() => {
    if (jwt) {
      MainApi.getCurrentUser(jwt)
        .then(res => setCurrentUser(res.user))
        .catch(err => alert(`Не удалось получить имя пользователя: ${err}`))
    }
  }, [jwt])


  useEffect(() => {
    if (jwt) {
      MoviesApi.getMovies()
        .then(res => {
          localStorage.setItem('data', JSON.stringify(res));
          const allMovies = JSON.parse(localStorage.getItem('data'));
          setLocalApiFilms(allMovies);
        })
        .catch(err => alert(`Не удалось получить список фильмов: ${err}`))
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt && currentUser !== null) {
      MainApi.getSavedFilms(jwt)
        .then(res => {
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((i) => i.owner === currentUser._id)))
          const userMovies = JSON.parse(localStorage.getItem('savedMovies'))
          setLocalSavedMovies(userMovies)
        })
        .catch(err => alert(`Не удалось получить список сохраненных фильмов: ${err}`))
    }
  }, [jwt, currentUser])



  const {width} = useWindowDimensions()

  /****************************
   *       Колбеки       *
   ***************************/

  /* Регистрация нового юзера */
  const handleRegistration = (input) => {
    setIsLoginPending(true)
    MainApi.registration(input)
      .then(() => {
        handleLogin({email: input.email, password: input.password})
      })
      .then(() => navigate('/movies'))
      .catch(err => alert(`Произошла ошибка регистрации: ${err}`))
      .finally(() => setIsLoginPending(false))
  }

  /* Функция логина */
  const handleLogin = (input) => {
    setIsLoginPending(true)
    MainApi.login(input)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setTimeout(() => {navigate('/movies')}, 200)
      })
      .catch(err => alert(`Произошла ошибка авторизации: ${err}`))
      .finally(() => setIsLoginPending(false))
  }

  /* Поиск фильмов */
  const handleSearch = (value) => {
      const filteredSearch = localApiFilms.filter((item) => {
        const values = value.toLowerCase();
        const nameEN = item.nameEN;
        const nameRU = item.nameRU.toLowerCase();

        return (nameEN && nameEN.toLowerCase().includes(values) && (values !== ''))
        || (nameRU && nameRU.toLowerCase().includes(value) && (values !== ''))
            ? item : null})

      localStorage.setItem('filtered', JSON.stringify(filteredSearch));

      setApiFilteredFilms(filteredSearch)

  }

  const handleSavedSearch = (value) => {
    const filteredSearch = localSavedMovies.filter((card) => {
      const values = value.toLowerCase();
      const nameEN = card.nameEN;
      const nameRU = card.nameRU.toLowerCase();
      return ((nameEN && nameEN.toLowerCase().includes(values)) || (nameRU && nameRU.toLowerCase().includes(value)))
        ? card : null
    });

    localStorage.setItem('savedFilter', JSON.stringify(filteredSearch));
    setSavedFilteredMovies(filteredSearch.length !== 0 ? filteredSearch : localSavedMovies);
  }

  /* фильтрация по длине фильма */
  const durationFilter = (checked) => {
    const filteredMovies = JSON.parse(localStorage.getItem('filtered'))

    if (checked === '1' && filteredMovies) {
      const shorts = filteredMovies.filter((item) => item.duration <= SHORT_FILMS);
      setApiFilteredFilms(shorts);
    } else {
      setApiFilteredFilms(filteredMovies);
    }
  };

  const savedDurationFilter = (checked) => {
    const savedFiltered = JSON.parse(localStorage.getItem('savedFilter'));
    if (checked === '1' && savedFiltered) {
      const shorts = savedFiltered.filter((item) => item.duration <= SHORT_FILMS);
      setSavedFilteredMovies(shorts);
    } else {
      setSavedFilteredMovies(savedFiltered);
    }
  }

  /* изменение отрисовки в зависимости от разрешения */
  useEffect(() => {
    if (width >= 1280) {
      setMoviesNumber(HIGH_RES_CARD_ADD_COUNT);
      setListLength(HIGH_RES_CARD_COUNT);
    } else if (width >= 768 && width <= 1279) {
      setMoviesNumber(SMALL_RES_CARD_ADD_COUNT);
      setListLength(MIDDLE_RES_CARD_COUNT);
    } else if (width <= 320 && width <= 480) {
      setMoviesNumber(SMALL_RES_CARD_ADD_COUNT);
      setListLength(SMALL_RES_CARD_COUNT);
    }
  }, [width])

  /* логика кнопки "Еще" */
  const addMovies = () => {
    setListLength(listLength + moviesNumber);
  };

  /* Сохранение фильма */
  const handleSaveMovie = (card) => {
    const liked = localSavedMovies.some((i) =>
      i.movieId === card.id
    );

    if (!liked) {
      MainApi.saveMovie(card, jwt)
        .then(res => {
          setLocalSavedMovies([...localSavedMovies, res])
        })
    } else {
      const cardForDelete = localSavedMovies.find((i) => i.movieId === card.id)
      handleDeleteMovie(cardForDelete)
    }
  }

  /* Удаление фильма */
  const handleDeleteMovie = (card) => {
    MainApi.deleteMovie(card, jwt)
      .then(() => {
        setSavedFilteredMovies(savedFilteredMovies.filter((i) => i._id !== card._id))
        setLocalSavedMovies(localSavedMovies.filter(i => i._id !== card._id))
      })
  }

  /* Редактирование профиля */
  const handleEditProfile = (user) => {
    MainApi.editCurrentUser(jwt, user)
      .then(res => {
        setCurrentUser(res)
        setTimeout(() => alert('Данные профиля успешно изменены'), 20)
      })
      .catch(err => alert(`Произошла ошибка редактирования профиля: ${err}`))
  }

  /* Состояние сайдбара */
  const handleSideBar = () => setIsSideBarActive(!isSideBarActive);

  /* Логаут */
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movieList');
    localStorage.removeItem('data')
    localStorage.removeItem('savedSearchValue')
    localStorage.removeItem('savedCheck')
    setCurrentUser(null)
    setIsLoggedIn(false);
    setSavedFilteredMovies([])
    setApiFilteredFilms([])
    setLocalSavedMovies([])
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header onSideBarOpen={handleSideBar} isLogged={isLoggedIn} useWindowDimensions={useWindowDimensions}/>
        <Routes>
          <Route path="/" element={
            <Main/>
          }
          />

          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!isLoggedIn}>
              <Sign submit={handleRegistration} isPending={isLoginPending}/>
            </ProtectedRoute>
          }/>

          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!isLoggedIn}>
              <Login submit={handleLogin} isPending={isLoginPending}/>
            </ProtectedRoute>
          }/>

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  currentUser={currentUser}
                  listLength={listLength}
                  durationFilter={durationFilter}
                  handleSearch={handleSearch}
                  savedMovies={localSavedMovies}
                  movieCards={apiFilteredFilms}
                  onSave={handleSaveMovie}
                  addMovies={addMovies}
                  onDelete={handleDeleteMovie}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  movieCards={savedFilteredMovies}
                  onDelete={handleDeleteMovie}
                  listLength={listLength}
                  durationFilter={savedDurationFilter}
                  handleSearch={handleSavedSearch}
                  addMovies={addMovies}
                  savedMovies={savedFilteredMovies}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  onSubmit={handleEditProfile}
                  signOut={handleSignOut}/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={
            <NotFound/>
          }/>
        </Routes>
        <Footer/>
        <SideBar
          isOpen={isSideBarActive}
          onClose={handleSideBar}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
