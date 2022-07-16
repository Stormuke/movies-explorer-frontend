import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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

function App() {
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [movieCards, setMovieCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localData, setLocalData] = useState([]);
  const [moviesNumber, setMoviesNumber] = useState(0);
  const [listLength, setListLength] = useState(0);


  const jwt = localStorage.getItem("jwt")

  const navigate = useNavigate();
  const location = useLocation();

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
          console.log(`Не удалось получить токен: ${err}`)
        })
    }
  }, [jwt])

  /* Установка юзера если есть токен */
  useEffect(() => {
    if (jwt) {
      MainApi.getCurrentUser(jwt)
        .then(res => setCurrentUser(res.user))
    }
  }, [isLoggedIn, jwt])

  /* Получение фильмов с апи, если есть токен */
  useEffect(() => {
    if (jwt) {
      MoviesApi.getMovies()
        .then(res => {
          localStorage.setItem('data', JSON.stringify(res));
          if ( location.pathname === '/movies') {
            const allMovies = JSON.parse(localStorage.getItem('data'));
            setLocalData(allMovies);
          }

        })
        .catch(err => console.log(err))
    }

  }, [jwt, location])

  useEffect(() => {
    if (jwt) {
      MainApi.getSavedFilms(jwt)
        .then(res => {
          localStorage.setItem('savedMovies', JSON.stringify(res.filter((i) => i.owner === currentUser._id)))

          if ( location.pathname === '/saved-movies' ) {
            const userMovies = JSON.parse(localStorage.getItem('savedMovies'));
            setLocalData(userMovies);
          }
        })
        .catch(err => console.log(err))
    }
  }, [jwt, location, currentUser._id])



  /* Кастомный хук для отслеживания размера экрана */
  function getWindowDimensions() {
    const {innerWidth: width} = window;
    return {
      width
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const { width } = useWindowDimensions()

  /****************************
   *       Колбеки       *
   ***************************/

  /* Регистрация нового юзера */
  const handleRegistration = (input) =>  {
    MainApi.registration(input)
      .then(() => navigate("/signin"))
      .catch(err => console.log(err))
  }

  /* Функция логина */
  const handleLogin = (input) => {
    MainApi.login(input)
      .then((res) => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        navigate("/movies")
      })
      .catch(err => console.log(err))
  }

  /* Поиск фильмов */
  const handleSearch = (value) => {
        const filteredSearch = localData.filter((item) => {
          const values = value.toLowerCase();
          const nameEN = item.nameEN;
          const nameRU = item.nameRU.toLowerCase();
          return ((nameEN && nameEN.toLowerCase().includes(values) && (values !== '')) || (nameRU && nameRU.toLowerCase().includes(value) && (values !== '')))
            && item
        });

        localStorage.setItem('filtered', JSON.stringify(filteredSearch));

        if (location.pathname === '/movies') {
          setMovieCards(filteredSearch);
        }

        if (location.pathname === '/saved-movies') {
          setSavedMovies(filteredSearch)
        }
  }

  useEffect(() => {
    const filteredMovies = JSON.parse(localStorage.getItem('filtered'));
    if (filteredMovies) {
      setLocalData(filteredMovies);
    } else {
      setLocalData([]);
    }
  }, []);

  /* фильтрация по длине фильма */
  const durationFilter = (checked) => {
    const filteredMovies = JSON.parse(localStorage.getItem('filtered'))

    if (!checked) {
      const shorts = filteredMovies.filter((item) => item.duration <= 40);
      setMovieCards(shorts);
    } else {
      setMovieCards(filteredMovies);
    }
  };

  /* изменение отрисовки в зависимости от разрешения */
  useEffect(() => {
    if (width >= 1280) {
      setMoviesNumber(4);
      setListLength(12);
    } else if (width >= 768 && width <= 1279) {
      setMoviesNumber(2);
      setListLength(8);
    } else if (width <= 320 && width <= 480) {
      setMoviesNumber(2);
      setListLength(5);
    }
  }, [width])

  /* логика кнопки "Еще" */
  const addMovies = () => {
    setListLength(listLength + moviesNumber);
  };

  /* Сохранение фильма */
  const handleSaveMovie = (card) => {
    MainApi.saveMovie(card, jwt)
      .then(res => {
        setSavedMovies([...savedMovies, res])
      })
  }

  /* Удаление фильма */
  const handleDeleteMovie = (card)  => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === card.movieId
    );
    MainApi.deleteMovie(card, jwt)
      .then(() => {
        const newCardArr = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        setSavedMovies(newCardArr)
      })
  }

  /* Редактирование профиля */
  const handleEditProfile = (user) =>  {
    MainApi.editCurrentUser(jwt, user)
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err))
  }

  /* Состояние сайдбара */
  const handleSideBar = () => setIsSideBarActive(!isSideBarActive);

  /* Логаут */
  const handleSignOut = ()  => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movieList');
    setIsLoggedIn(false);
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
            <Sign submit={handleRegistration}/>
          }/>

          <Route path="/signin" element={
            <Login submit={handleLogin}/>
          }/>

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  listLength={listLength}
                  durationFilter={durationFilter}
                  handleSearch={handleSearch}
                  savedMovies={savedMovies}
                  movieCards={movieCards}
                  onSave={handleSaveMovie}
                  addMovies={addMovies}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  movieCards={savedMovies}
                  onDelete={handleDeleteMovie}
                  listLength={listLength}
                  durationFilter={durationFilter}
                  handleSearch={handleSearch}
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
